package com.trustcert.exceptions;

public class IllegalVerifierException extends RuntimeException {

    public IllegalVerifierException(String msg) {
        super(msg);
    }
}