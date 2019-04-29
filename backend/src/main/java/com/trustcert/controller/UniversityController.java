package com.trustcert.controller;

import com.trustcert.blockchain.user.RegisterUser;
import com.trustcert.exceptions.AuthenticationException;
import com.trustcert.exceptions.IllegalUniversityException;
import com.trustcert.model.PasswordModel;
import com.trustcert.model.UniversityModel;
import com.trustcert.repository.UniversityRepository;
import com.trustcert.utility.PasswordEncoderBean;
import com.trustcert.utility.UserRolesEnum;

import lombok.Data;

import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class UniversityController {

    private final UniversityRepository repository;

    UniversityController(UniversityRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/universities")
    List<UniversityModel> retrieveAllUniversities(){
        return repository.findAll();
    }

    @PostMapping("/universities")
    UniversityModel addUniversity(@RequestBody UniversityModel newUniversity) {
        if (!validateRequest(newUniversity)){
            throw new IllegalUniversityException("Missing Required Information. Cannot proceed to register.");
        }
        newUniversity.setSecret(null);
        newUniversity.setPassword(PasswordEncoderBean.passwordEncoder().encode(newUniversity.getPassword()));
        return repository.save(newUniversity);
    }

    // Single university
    @GetMapping("/universities/{email}")
    UniversityModel findUniversityByEmail(@PathVariable String email) {

        UniversityModel universityModel = repository.findByUniversityPrimaryEmail(email);
        if (universityModel == null){
            throw new IllegalUniversityException("Cannot find university with email: "+ email);
        }
        return universityModel;
    }

    @PutMapping("/universities/{email}/passwordchange")
    UniversityModel updatePassword(@RequestBody PasswordModel passwordModel, @PathVariable String email) {

        return repository.findById(email)
                .map(universityModel -> {
                    if (PasswordEncoderBean.passwordEncoder().matches(passwordModel.getCurrentPassword(),universityModel.getPassword())){
                        universityModel.setPassword(PasswordEncoderBean.passwordEncoder().encode(passwordModel.getNewPassword()));
                        return repository.save(universityModel);
                    }
                    else {
                        throw new AuthenticationException("Incorrect current password entered. Not authorized.");
                    }
                })
                .orElseThrow(() -> new IllegalUniversityException("Cannot find university with email: "+ email));
    }

    @PutMapping("/universities/{email}/register")
    String registerUniversity(@RequestBody UniversityModel newUniversity, @PathVariable String email) {

        return repository.findById(email)
                .map(universityModel-> {
                    try{
                        if (universityModel.getVerified().equals(Boolean.TRUE)){
                            return "Oops.! It looks like you have already verified with TrustCert. Please login with the application.";
                        }

                        RegisterUser registerUserInstance = new RegisterUser();
                        String eSecret = registerUserInstance.registerUser(universityModel.getUniversityPrimaryEmail(), UserRolesEnum.UNIVERSITY);
                        universityModel.setSecret(eSecret);
                        universityModel.setVerified(Boolean.TRUE);
                    }
                    catch(Exception ex){
                        System.out.print(ex);
                        throw new IllegalUniversityException("Cannot create university identity with email: "+ universityModel.getUniversityPrimaryEmail() + ". Verification Failed. Please try again later. Sorry for the inconveniences.");
                    }
                    repository.save(universityModel);
                    return "Thank you for verifying.! Now you can login with the application.";
                })
                .orElseThrow(() -> new IllegalUniversityException("Cannot find university with email: "+ email));
    }

    @PostMapping("/universities/login")
    LoginResponse authenticateUniversity(@RequestBody UniversityModel model) {

        UniversityModel universityModel = repository.findByUniversityPrimaryEmail(model.getUniversityPrimaryEmail());
        if (universityModel == null){
            throw new IllegalUniversityException("Cannot find university with email: "+model.getUniversityPrimaryEmail());
        }
        if (!PasswordEncoderBean.passwordEncoder().matches(model.getPassword(),universityModel.getPassword())){
            throw new AuthenticationException("Incorrect password entered. Cannot authenticate.");
        }
        if (universityModel.getVerified().equals(Boolean.FALSE)){
            throw new IllegalUniversityException("University with email: " + model.getUniversityPrimaryEmail() + " is not verified.");
        }

        LoginResponse loginResponse = new LoginResponse(universityModel);
        return loginResponse;
    }

    @Data
    private static class LoginResponse implements Serializable {
        String universityPrimaryEmail;
        String secret;
        String universityName;

        LoginResponse(UniversityModel universityModel){
            this.universityPrimaryEmail = universityModel.getUniversityPrimaryEmail();
            this.secret = universityModel.getSecret();
            this.universityName = universityModel.getUniversityName();
        }
    }

    private Boolean validateRequest(UniversityModel universityModel){

        if(universityModel.getUniversityName() == null ||
                universityModel.getUniversityPrimaryEmail() == null ||
                universityModel.getPassword() == null)
        {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }
}