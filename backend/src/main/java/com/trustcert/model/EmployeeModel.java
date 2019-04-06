package com.trustcert.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class EmployeeModel {

    @Id
    private String employeeEmail;
    private String employeeName;
    private Boolean isVerified = Boolean.FALSE;

    EmployeeModel(String employeeEmail,String employeeName) {
        this.employeeEmail = employeeEmail;
        this.employeeName = employeeName;
    }

}
