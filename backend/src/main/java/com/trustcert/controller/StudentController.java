package com.trustcert.controller;


import com.trustcert.exceptions.IllegalStudentException;
import com.trustcert.model.StudentDetailModel;
import com.trustcert.model.StudentModel;
import com.trustcert.repository.StudentRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StudentController {

    private final StudentRepository repository;

    StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/students")
    StudentModel addStudent(@RequestBody StudentModel newStudent) {

        //TODO: Register User Call Node sdk to do it.
        return repository.save(newStudent);
    }

    // Single item
    @GetMapping("/students/{email}")
    StudentModel findStudentByEmail(@PathVariable String email) {

        StudentModel student = repository.findByStudentEmail(email);
        if (student == null){
            throw new IllegalStudentException(email);
        }
        return student;
    }

    @PutMapping("/students/{email}")
    StudentModel replaceStudent(@RequestBody StudentModel newStudent, @PathVariable String email) {

        return repository.findById(email)
                .map(student -> {
                    student.setStudentFirstName(newStudent.getStudentFirstName());
                    student.setStudentLastName(newStudent.getStudentLastName());
                    student.setPassword(newStudent.getPassword());
                    return repository.save(student);
                })
                .orElseThrow(() -> new IllegalStudentException(email));
    }

    @PostMapping("/student/login")
    LoginResponse authenticateStudent(@RequestBody String email, @RequestBody String password) {

        StudentModel student = repository.findByStudentEmail(email);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+email);
        }
        if (student.getVerified() == Boolean.FALSE){
            throw new IllegalStudentException("Student with email: " + email + " is not verified.");
        }
        if (!student.getPassword().equals(password)){
            throw new IllegalStudentException("Incorrect password entered.");
        }
        LoginResponse loginResponse = new LoginResponse(student.getStudentPrimaryEmail(), student.getSecret(),student.getSecondaryAccountDetails());
        return loginResponse;
    }

    private static class LoginResponse{
        String studentPrimaryEmail;
        String secret;
        List<StudentDetailModel> secondaryAccountDetails;

        LoginResponse(String studentPrimaryEmail, String secret, List<StudentDetailModel> list){
            this.studentPrimaryEmail = studentPrimaryEmail;
            this.secret = secret;
            this.secondaryAccountDetails.addAll(list);
        }
    }
}