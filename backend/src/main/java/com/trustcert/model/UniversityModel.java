package com.trustcert.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
public class UniversityModel implements Serializable {

    @Id
    private String universityPrimaryEmail; // Primary User Identity
    private String universityName;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private String secret;
    private Boolean isVerified = Boolean.FALSE;

    UniversityModel(String universityPrimaryEmail, String universityName, String password, String secret) {
        this.universityPrimaryEmail = universityPrimaryEmail;
        this.universityName = universityName;
        this.password = password;
        this.secret = secret;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }

    public String getUniversityPrimaryEmail() {
        return universityPrimaryEmail;
    }

    public void setUniversityPrimaryEmail(String universityPrimaryEmail) {
        this.universityPrimaryEmail = universityPrimaryEmail;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
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
