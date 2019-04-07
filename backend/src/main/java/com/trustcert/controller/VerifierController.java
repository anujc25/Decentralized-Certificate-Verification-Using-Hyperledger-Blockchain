package com.trustcert.controller;

import com.trustcert.exceptions.AuthenticationException;
import com.trustcert.exceptions.IllegalVerifierException;
import com.trustcert.model.PasswordModel;
import com.trustcert.model.VerifierModel;
import com.trustcert.repository.VerifierRepository;
import com.trustcert.utility.PasswordEncoderBean;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.List;

@RestController
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

        //TODO: Register User. Call Java sdk to do it.

        newVerifier.setPassword(PasswordEncoderBean.passwordEncoder().encode(newVerifier.getPassword()));
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
                .map(verifier -> {
                    verifier.setVerifierFirstName(newVerifier.getVerifierFirstName());
                    verifier.setVerifierLastName(newVerifier.getVerifierLastName());
//                    verifier.setPassword(newVerifier.getPassword());
                    verifier.setVerified(newVerifier.getVerified());
                    return repository.save(verifier);
                })
                .orElseThrow(() -> new IllegalVerifierException("Cannot find verifier with email: "+ email));
    }

    @PutMapping("/verifiers/{email}/passwordchange")
    VerifierModel updatePassword(@RequestBody PasswordModel passwordModel, @PathVariable String email) {

        return repository.findById(email)
                .map(verifier -> {
                    if (PasswordEncoderBean.passwordEncoder().matches(passwordModel.getCurrentPassword(),verifier.getPassword())){
                        verifier.setPassword(PasswordEncoderBean.passwordEncoder().encode(passwordModel.getNewPassword()));
                        return repository.save(verifier);
                    }
                    else {
                        throw new AuthenticationException("Incorrect current password entered. Not authorized.");
                    }
                })
                .orElseThrow(() -> new IllegalVerifierException("Cannot find verifier with email: "+ email));
    }

    @PostMapping("/verifiers/login")
    LoginResponse authenticateEmployer(@RequestBody VerifierModel model) {

        VerifierModel verifier = repository.findByVerifierPrimaryEmail(model.getVerifierEmail());
        if (verifier == null){
            throw new IllegalVerifierException("Cannot find verifier with email: "+model.getVerifierEmail());
        }
        if (verifier.getVerified() == Boolean.FALSE){
            throw new IllegalVerifierException("Verifier with email: " + model.getVerifierEmail() + " is not verified.");
        }
        if (!PasswordEncoderBean.passwordEncoder().matches(model.getPassword(),verifier.getPassword())){
            throw new IllegalVerifierException("Incorrect password entered.");
        }
        LoginResponse loginResponse = new LoginResponse(verifier.getVerifierEmail(), verifier.getSecret());
        return loginResponse;
    }

    @Data
    private static class LoginResponse implements Serializable {
        String verifierPrimaryEmail;
        String secret;

        LoginResponse(String verifierPrimaryEmail, String secret){
            this.verifierPrimaryEmail = verifierPrimaryEmail;
            this.secret = secret;
        }
    }
}