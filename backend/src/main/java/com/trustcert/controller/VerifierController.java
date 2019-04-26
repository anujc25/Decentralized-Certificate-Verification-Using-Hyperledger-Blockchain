package com.trustcert.controller;

import com.trustcert.blockchain.user.RegisterUser;
import com.trustcert.exceptions.AuthenticationException;
import com.trustcert.exceptions.IllegalStudentException;
import com.trustcert.exceptions.IllegalVerifierException;
import com.trustcert.model.PasswordModel;
import com.trustcert.utility.UserRolesEnum;
import com.trustcert.model.VerifierModel;
import com.trustcert.repository.VerifierRepository;
import com.trustcert.utility.PasswordEncoderBean;

import lombok.Data;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Properties;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "*")
public class VerifierController {

    private final VerifierRepository repository;

    VerifierController(VerifierRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/verifiers")
    List<VerifierModel> retrieveAllVerifiers(){
        return repository.findAll();
    }

    @PostMapping("/verifiers")
    VerifierModel addVerifier(@RequestBody VerifierModel newVerifier) {

        // Adding primary email-id in details while student registers
        // This will be required when we want to fetch all the email-ids of the student
        if (!validateRequest(newVerifier)){
            throw new IllegalStudentException("Missing Required Information. Cannot proceed to register.");
        }
        newVerifier.setPassword(PasswordEncoderBean.passwordEncoder().encode(newVerifier.getPassword()));
        try{
            RegisterUser registerUserInstance = new RegisterUser();
            String eSecret = registerUserInstance.registerUser(newVerifier.getVerifierEmail(), UserRolesEnum.VERIFIER);
            newVerifier.setSecret(eSecret);
        }
        catch(Exception ex){
            throw new IllegalVerifierException("Cannot create verifier identity with email: "+ newVerifier.getVerifierEmail());
        }
        sendVerificationEmail(newVerifier, newVerifier.getVerifierEmail());
        return repository.save(newVerifier);
    }

    // Single Verifier
    @GetMapping("/verifiers/{email}")
    VerifierModel findVerifierByEmail(@PathVariable String email) {
        VerifierModel verifier = repository.findByVerifierPrimaryEmail(email);
        if (verifier == null){
            throw new IllegalVerifierException("Cannot find verifier with email: "+ email);
        }
        return verifier;
    }

    @PutMapping("/verifiers/{email}")
    VerifierModel replaceVerifier(@RequestBody VerifierModel newVerifier, @PathVariable String email) {

        return repository.findById(email)
                .map(verifierModel -> {
                    if (newVerifier.getVerifierFirstName()!=null){
                        verifierModel.setVerifierFirstName(newVerifier.getVerifierFirstName());
                    }
                    if (newVerifier.getVerifierLastName()!=null){
                        verifierModel.setVerifierLastName(newVerifier.getVerifierLastName());
                    }
                    if (newVerifier.getVerifierOrganization()!=null){
                        verifierModel.setVerifierOrganization(newVerifier.getVerifierOrganization());
                    }
                    return repository.save(verifierModel);
                })
                .orElseThrow(() -> new IllegalVerifierException("Cannot find verifier with email: "+ email));
    }

    @GetMapping("/verifiers/verify/{encryptedIds}")
    VerifierModel verifyVerifierEmailId(@PathVariable String encryptedIds) {
        try {
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] decodedByteArray = decoder.decode(encryptedIds);
            String ids = new String(decodedByteArray);

            String primaryEmailId = ids.split(Pattern.quote("/"))[0];

            VerifierModel verifierModel = repository.findByVerifierPrimaryEmail(primaryEmailId);
            if (verifierModel == null){
                throw new IllegalVerifierException("Cannot find verifier with email: "+ primaryEmailId);
            }
            verifierModel.setVerified(Boolean.TRUE);
            return repository.save(verifierModel);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }


    @PutMapping("/verifiers/{email}/passwordchange")
    VerifierModel updatePassword(@RequestBody PasswordModel passwordModel, @PathVariable String email) {

        return repository.findById(email)
                .map(verifierModel -> {
                    if (PasswordEncoderBean.passwordEncoder().matches(passwordModel.getCurrentPassword(),verifierModel.getPassword())){
                        verifierModel.setPassword(PasswordEncoderBean.passwordEncoder().encode(passwordModel.getNewPassword()));
                        return repository.save(verifierModel);
                    }
                    else {
                        throw new AuthenticationException("Incorrect current password entered. Not authorized.");
                    }
                })
                .orElseThrow(() -> new IllegalVerifierException("Cannot find verifier with email: "+ email));
    }

    @PostMapping("/verifiers/login")
    LoginResponse authenticateEmployer(@RequestBody VerifierModel model) {

        VerifierModel verifierModel = repository.findByVerifierPrimaryEmail(model.getVerifierEmail());
        if (verifierModel == null){
            throw new IllegalVerifierException("Cannot find verifier with email: "+model.getVerifierEmail());
        }
        if (!PasswordEncoderBean.passwordEncoder().matches(model.getPassword(),verifierModel.getPassword())){
            throw new IllegalVerifierException("Incorrect password entered. Cannot authenticate.");
        }
        if (verifierModel.getVerified() == Boolean.FALSE){
            throw new IllegalVerifierException("Verifier with email: " + model.getVerifierEmail() + " is not verified.");
        }
        LoginResponse loginResponse = new LoginResponse(verifierModel);
        return loginResponse;
    }

    @Data
    private static class LoginResponse implements Serializable {
        String verifierPrimaryEmail;
        String verifierFirstName;
        String verifierLastName;
        String verifierOrganization;
        String secret;

        LoginResponse(VerifierModel verifierModel){
            this.verifierFirstName = verifierModel.getVerifierFirstName();
            this.verifierLastName = verifierModel.getVerifierLastName();
            this.verifierOrganization = verifierModel.getVerifierOrganization();
            this.verifierPrimaryEmail = verifierModel.getVerifierEmail();
            this.secret = verifierModel.getSecret();
        }
    }

    private Boolean validateRequest(VerifierModel verifierModel){

        if(verifierModel.getVerifierLastName() == null ||
                verifierModel.getVerifierFirstName() == null ||
                verifierModel.getVerifierOrganization() == null ||
                verifierModel.getVerifierEmail() == null ||
                verifierModel.getPassword() == null)
        {
            return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }

    private Boolean sendVerificationEmail(VerifierModel verifierModel, String primaryEmail) {
        final String senderUsername = "project.trustcert@gmail.com";
        final String senderPassword = ""; // Add the password for sender email-id

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(senderUsername, senderPassword);
                    }
                });

        try {
            String ids = primaryEmail;
            Base64.Encoder encoder = Base64.getEncoder();
            String encodedIds = encoder.encodeToString(
                    ids.getBytes(StandardCharsets.UTF_8) );

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderUsername));
            message.setRecipients(Message.RecipientType.TO,
                    // InternetAddress.parse(secondaryEmail));
                    InternetAddress.parse(primaryEmail));
            message.setSubject("TrustCert - Verify your Email Address");
            message.setText( "Hello, " +  verifierModel.getVerifierFirstName() + ","+  System.lineSeparator() + System.lineSeparator() +
                    "Thank you for taking the your time to register with TrustCert Certificate Verification Service." + System.lineSeparator() +
                    "We aim to provide the verifiers with the quickest way and most easy way to verify applicant's certificates."+ System.lineSeparator() +
                    "We hope you enjoy our service and save your precious time. We would like you to please verify your email address."+ System.lineSeparator() +
                    "Please verify your email address by clicking the link below."+ System.lineSeparator() +
                    "http://ec2-13-52-182-144.us-west-1.compute.amazonaws.com:8080/verifiers/verify/"+ encodedIds +  System.lineSeparator() + System.lineSeparator() +
                    "Thank you.!" + System.lineSeparator() + System.lineSeparator() +
                    "Regards," + System.lineSeparator() +
                    "Team TrustCert"
            );

            System.out.println("Done");
            Transport.send(message);

            System.out.println("Sent message successfully....");
            return true;

        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}