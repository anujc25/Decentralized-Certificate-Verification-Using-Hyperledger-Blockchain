package com.trustcert.model;

import lombok.Data;

@Data
public class StudentDetailModel {

    private String email;
    private Boolean isVerified = Boolean.FALSE;

    StudentDetailModel(String email){
        this.email = email;
    }

}
