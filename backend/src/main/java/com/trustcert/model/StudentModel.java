package com.trustcert.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.io.Serializable;
import java.util.List;

@Data
public class StudentModel implements Serializable {

    @Id
    private String studentPrimaryEmail; // Primary User Identity
    private String studentFirstName;
    private String studentLastName;
    private String password;

    private String secret;

    private List<StudentDetailModel> secondaryAccountDetails;

    private Boolean isVerified = Boolean.FALSE;

    StudentModel(String studentPrimaryEmail, String studentFirstName, String studentLastName, String password, String secret) {
        this.studentPrimaryEmail = studentPrimaryEmail;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.password = password;
        this.secret = secret;
    }

    public String getStudentPrimaryEmail() {
        return studentPrimaryEmail;
    }

    public void setStudentPrimaryEmail(String studentPrimaryEmail) {
        this.studentPrimaryEmail = studentPrimaryEmail;
    }

    public String getStudentFirstName() {
        return studentFirstName;
    }

    public void setStudentFirstName(String studentFirstName) {
        this.studentFirstName = studentFirstName;
    }

    public String getStudentLastName() {
        return studentLastName;
    }

    public void setStudentLastName(String studentLastName) {
        this.studentLastName = studentLastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public List<StudentDetailModel> getSecondaryAccountDetails() {
        return secondaryAccountDetails;
    }

    public void setSecondaryAccountDetails(List<StudentDetailModel> secondaryAccountDetails) {
        this.secondaryAccountDetails = secondaryAccountDetails;
    }

    public Boolean getVerified() {
        return isVerified;
    }

    public void setVerified(Boolean verified) {
        isVerified = verified;
    }
}
