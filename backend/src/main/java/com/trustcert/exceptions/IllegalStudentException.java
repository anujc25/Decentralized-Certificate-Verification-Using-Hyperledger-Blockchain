package com.trustcert.exceptions;

public class IllegalStudentException extends RuntimeException {

    public IllegalStudentException(String email) {
        super("Could not find student with email " + email);
    }
}