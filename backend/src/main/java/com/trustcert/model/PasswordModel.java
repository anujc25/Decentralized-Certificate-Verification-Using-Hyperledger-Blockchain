package com.trustcert.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class PasswordModel implements Serializable {

    private String currentPassword;
    private String newPassword;

    PasswordModel(String currentPassword, String newPassword){
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
