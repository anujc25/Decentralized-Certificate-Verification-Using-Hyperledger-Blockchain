package com.trustcert.controller;

import com.trustcert.exceptions.IllegalStudentException;
import com.trustcert.model.StudentDetailModel;
import com.trustcert.model.StudentModel;
import com.trustcert.repository.StudentRepository;
import lombok.Data;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;

@RestController
public class StudentController {

    private final StudentRepository repository;

    StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/students")
    List<StudentModel> retrieveAllStudents(){
        return repository.findAll();
    }

    @PostMapping("/students")
    StudentModel addStudent(@RequestBody StudentModel newStudent) {

        //TODO: Register User Call Node sdk to do it.
        return repository.save(newStudent);
    }

    // Single item
    @GetMapping("/students/{email}")
    StudentModel findStudentByEmail(@PathVariable String email) {

        StudentModel student = repository.findByStudentPrimaryEmail(email);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ email);
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
                    student.setVerified(newStudent.getVerified());
                    return repository.save(student);
                })
                .orElseThrow(() -> new IllegalStudentException("Cannot find student with email: "+ email));
    }

//    @PutMapping("/students/{email}")
//    StudentModel addStudentSecondaryEmail(@RequestBody List<String> emails, @PathVariable String email) {
//
//        return repository.findById(email)
//                .map(student -> {
//                    for(String secondaryEmail: emails){
//                        student.addSecondaryStudentEmail(email);
//                    }
//                    return repository.save(student);
//                })
//                .orElseThrow(() -> new IllegalStudentException(email));
//    }
    @PostMapping("/student/login")
    LoginResponse authenticateStudent(@RequestBody StudentModel model) {

        StudentModel student = repository.findByStudentPrimaryEmail(model.getStudentPrimaryEmail());
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+model.getStudentPrimaryEmail());
        }
        if (student.getVerified() == Boolean.FALSE){
            throw new IllegalStudentException("Student with email: " + model.getStudentPrimaryEmail() + " is not verified.");
        }
        if (!student.getPassword().equals(model.getPassword())){
            throw new IllegalStudentException("Incorrect password entered.");
        }
        LoginResponse loginResponse = new LoginResponse(student.getStudentPrimaryEmail(), student.getSecret(),student.getSecondaryAccountDetails());
        return loginResponse;
    }
    @Data
    private static class LoginResponse implements Serializable {
        String studentPrimaryEmail;
        String secret;
        List<StudentDetailModel> secondaryAccountDetails;

        LoginResponse(String studentPrimaryEmail, String secret, List<StudentDetailModel> list){
            this.studentPrimaryEmail = studentPrimaryEmail;
            this.secret = secret;
            if(list != null) {
                this.secondaryAccountDetails.addAll(list);
            }
        }
    }
}