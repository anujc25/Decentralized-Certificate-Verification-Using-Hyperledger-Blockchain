package com.trustcert.controller;

import com.trustcert.exceptions.AuthenticationException;
import com.trustcert.exceptions.IllegalStudentException;
import com.trustcert.model.PasswordModel;
import com.trustcert.model.StudentModel;
import com.trustcert.utility.UserRolesEnum;
import com.trustcert.repository.StudentRepository;
import com.trustcert.utility.PasswordEncoderBean;
import com.trustcert.blockchain.user.RegisterUser;

import lombok.Data;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Pattern;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository repository;

    StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/students")
    List<StudentModel> retrieveAllStudents(){
        return repository.findAll();
    }

    @PostMapping("/students")
    StudentModel addStudent(@RequestBody StudentModel newStudent) {

        // Adding primary email-id in details while student registers
        // This will be required when we want to fetch all the email-ids of the student

        if (!validateRequest(newStudent)){
            throw new IllegalStudentException("Missing Required Information. Cannot proceed to register.");
        }

        Map<String,Boolean> s = new HashMap<>();
        s.put(newStudent.getStudentPrimaryEmail(),Boolean.FALSE);

        newStudent.setSecondaryAccountDetails(s);
        newStudent.setPassword(PasswordEncoderBean.passwordEncoder().encode(newStudent.getPassword()));

        try{
            RegisterUser registerUserInstance = new RegisterUser();
            String eSecret = registerUserInstance.registerUser(newStudent.getStudentPrimaryEmail(), UserRolesEnum.STUDENT);
            newStudent.setSecret(eSecret);
        }
        catch(Exception ex){
            throw new IllegalStudentException("Cannot create student identity with email: "+ newStudent.getStudentPrimaryEmail());
        }
        sendVerificationEmail(newStudent, newStudent.getStudentPrimaryEmail(), newStudent.getStudentPrimaryEmail());

        return repository.save(newStudent);
    }

    @PostMapping("/students/email")
    StudentModel addStudentEmailId(@RequestBody Map<String, Object> payload) {

        JSONObject jsonObject = new JSONObject(payload);
        String studentPrimaryEmail = jsonObject.getString("studentPrimaryEmail");
        String studentSecondaryEmail = jsonObject.getString("studentSecondaryEmail");

        StudentModel student = repository.findByStudentPrimaryEmail(studentPrimaryEmail);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ studentPrimaryEmail);
        }

        student.addSecondaryStudentEmail(studentSecondaryEmail);
        sendVerificationEmail(student, studentPrimaryEmail, studentSecondaryEmail);

        return repository.save(student);
    }

    @GetMapping("/students/email/{studentPrimaryEmail}")
    Map<String,Boolean> getStudentEmailIds(@PathVariable String studentPrimaryEmail) {

        StudentModel student = repository.findByStudentPrimaryEmail(studentPrimaryEmail);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ studentPrimaryEmail);
        }

        Map<String,Boolean> studentEmails = student.getSecondaryAccountDetails();
        Set<String> setKeys = studentEmails.keySet();
        // remove emails that are not verified

        for (Iterator<String> i = setKeys.iterator(); i.hasNext();) {
            String sd = i.next();
            if (studentEmails.get(sd).equals(Boolean.FALSE)) {
                i.remove();
            }
        }

        return studentEmails;
    }

    // Single student
    @GetMapping("/students/{email}")
    StudentModel findStudentByEmail(@PathVariable String email) {

        StudentModel student = repository.findByStudentPrimaryEmail(email);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ email);
        }
        return student;
    }

    @PutMapping("/students/{email}")
    StudentModel replaceStudent(@RequestBody StudentModel newStudent, @PathVariable String email) {

        return repository.findById(email)
                .map(student -> {
                    if (newStudent.getStudentFirstName()!=null){
                        student.setStudentFirstName(newStudent.getStudentFirstName());
                    }
                    if (newStudent.getStudentLastName()!=null){
                        student.setStudentLastName(newStudent.getStudentLastName());
                    }
//                    if (newStudent.getSecondaryAccountDetails()!=null && newStudent.getSecondaryAccountDetails().size()!=0){
//
//                        if (student.getSecondaryAccountDetails()==null){
//                            student.getSecondaryAccountDetails().addAll(newStudent.getSecondaryAccountDetails());
//                        }
//                        else {
//                            for(StudentDetailModel sd: newStudent.getSecondaryAccountDetails()){
//                                if (!student.getSecondaryAccountDetails().contains(sd)){
//                                    student.getSecondaryAccountDetails().add(sd);
//                                }
//                            }
//                        }
//                    }
                    return repository.save(student);
                })
                .orElseThrow(() -> new IllegalStudentException("Cannot find student with email: "+ email));
    }

    @GetMapping("/students/verify/{encryptedIds}")
    StudentModel verifyStudentEmailId(@PathVariable String encryptedIds) {
        try {
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] decodedByteArray = decoder.decode(encryptedIds);
            String ids = new String(decodedByteArray);
            
            String primaryEmailId = ids.split(Pattern.quote("/"))[0];
            String secondaryEmailId = ids.split(Pattern.quote("/"))[1];

            StudentModel student = repository.findByStudentPrimaryEmail(primaryEmailId);
            if (student == null){
                throw new IllegalStudentException("Cannot find student with email: "+ primaryEmailId);
            }
            Map<String,Boolean> studentEmails = student.getSecondaryAccountDetails();
            Set<String> s = studentEmails.keySet();
            // verify the matching emailId
            for (Iterator<String> i = s.iterator(); i.hasNext();) {
                String sd = i.next();
                if (sd.equals(secondaryEmailId)) {
                    studentEmails.replace(sd,Boolean.TRUE);
                    break;
                }
            }
            student.setSecondaryAccountDetails(studentEmails);
            return repository.save(student);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @PutMapping("/students/{email}/passwordchange")
    StudentModel updatePassword(@RequestBody PasswordModel passwordModel, @PathVariable String email) {

        return repository.findById(email)
                .map(student -> {
                    if (PasswordEncoderBean.passwordEncoder().matches(passwordModel.getCurrentPassword(),student.getPassword())){
                        student.setPassword(PasswordEncoderBean.passwordEncoder().encode(passwordModel.getNewPassword()));
                        return repository.save(student);
                    }
                    else {
                        throw new AuthenticationException("Incorrect current password entered. Not authorized.");
                    }
                })
                .orElseThrow(() -> new IllegalStudentException("Cannot find student with email: "+ email));
    }

    @PostMapping("/students/login")
    LoginResponse authenticateStudent(@RequestBody StudentModel model) {

        StudentModel student = repository.findByStudentPrimaryEmail(model.getStudentPrimaryEmail());
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+model.getStudentPrimaryEmail());
        }
        if (!PasswordEncoderBean.passwordEncoder().matches(model.getPassword(),student.getPassword())){
            throw new AuthenticationException("Incorrect password entered. Cannot authenticate.");
        }

        Map<String, Boolean> studentEmails = new HashMap<>();
        // verify the matching emailId
        if (studentEmails.get(model.getStudentPrimaryEmail()).equals(Boolean.FALSE)){
            throw new IllegalStudentException("Student with email: " + model.getStudentPrimaryEmail() + " is not verified.");
        }
        LoginResponse loginResponse = new LoginResponse(student);
        return loginResponse;
    }

    @Data
    private static class LoginResponse implements Serializable {
        String studentPrimaryEmail;
        String secret;
        String studentFirstName;
        String studentLastName;
        Map<String,Boolean> secondaryAccountDetails = new HashMap<>();

        LoginResponse(StudentModel studentModel){
            this.studentPrimaryEmail = studentModel.getStudentPrimaryEmail();
            this.secret = studentModel.getSecret();
            if(studentModel.getSecondaryAccountDetails() != null) {
                this.secondaryAccountDetails.putAll(studentModel.getSecondaryAccountDetails());
            }
            this.studentFirstName = studentModel.getStudentFirstName();
            this.studentLastName = studentModel.getStudentLastName();
        }
    }

    private Boolean sendVerificationEmail(StudentModel newStudent, String primaryEmail, String secondaryEmail) {
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
            String ids = primaryEmail + "/" + secondaryEmail;
            Base64.Encoder encoder = Base64.getEncoder();
            String encodedIds = encoder.encodeToString(
                    ids.getBytes(StandardCharsets.UTF_8) );

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderUsername));
            message.setRecipients(Message.RecipientType.TO,
                // InternetAddress.parse(secondaryEmail));
                InternetAddress.parse(secondaryEmail));
            message.setSubject("TrustCert - Verify your Email Address");
            message.setText( "Hello " +  newStudent.getStudentFirstName() + "," + System.lineSeparator() + System.lineSeparator() +
                    "Thank you for taking the first step towards securing your certificates." + System.lineSeparator() +
                    "Please verify your email address by clicking the link below."+ System.lineSeparator() +
                    "http://ec2-13-52-182-144.us-west-1.compute.amazonaws.com:8080/students/verify/"+ encodedIds +  System.lineSeparator() + System.lineSeparator() +
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
    private Boolean validateRequest(StudentModel studentModel){

        if(studentModel.getStudentFirstName() == null ||
           studentModel.getStudentLastName() == null ||
           studentModel.getStudentPrimaryEmail() == null ||
           studentModel.getPassword() == null)
        {
            return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }
}