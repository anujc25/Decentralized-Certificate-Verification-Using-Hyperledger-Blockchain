package com.trustcert.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class VerifierModel {

    @Id
    private String verifierPrimaryEmail;
    private String verifierFirstName;
    private String verifierLastName;
    private String verifierOrganization;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String secret;

    private Boolean isVerified = Boolean.FALSE;

    VerifierModel(String verifierEmail, String verifierFirstName,
                  String verifierLastName, String verifierOrganization,
                  String password, String secret) {

        this.verifierPrimaryEmail = verifierEmail;
        this.verifierFirstName = verifierFirstName;
        this.verifierLastName = verifierLastName;
        this.verifierOrganization= verifierOrganization;
        this.password = password;
        this.secret = secret;
    }

    public String getVerifierEmail() {
        return verifierPrimaryEmail;
    }

    public void setVerifierEmail(String verifierPrimaryEmail) {
        this.verifierPrimaryEmail = verifierPrimaryEmail;
    }

    public String getVerifierFirstName() {
        return verifierFirstName;
    }

    public void setVerifierFirstName(String verifierFirstName) {
        this.verifierFirstName = verifierFirstName;
    }

    public String getVerifierLastName() {
        return verifierLastName;
    }

    public void setVerifierLastName(String verifierLastName) {
        this.verifierLastName = verifierLastName;
    }

    public String getVerifierOrganization() {
        return verifierOrganization;
    }

    public void setVerifierOrganization(String verifierOrganization) {
        this.verifierOrganization = verifierOrganization;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }
    @JsonProperty("password")
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public String getSecret() {
        return secret;
    }
    @JsonProperty("secret")
    public void setSecret(String secret) {
        this.secret = secret;
    }
}
