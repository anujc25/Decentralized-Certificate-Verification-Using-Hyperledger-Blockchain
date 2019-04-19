package com.trustcert.controller;

import com.trustcert.exceptions.AuthenticationException;
import com.trustcert.exceptions.IllegalStudentException;
import com.trustcert.model.PasswordModel;
import com.trustcert.model.StudentDetailModel;
import com.trustcert.model.StudentModel;
import com.trustcert.repository.StudentRepository;
import com.trustcert.utility.PasswordEncoderBean;
import lombok.Data;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "*")
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

        // Adding primary email-id in details while student registers
        // This will be required when we want to fetch all the email-ids of the student
        StudentDetailModel sd = new StudentDetailModel(newStudent.getStudentPrimaryEmail());
        Set<StudentDetailModel> s = new HashSet<>();
        s.add(sd);
        newStudent.setSecondaryAccountDetails(s);

        newStudent.setPassword(PasswordEncoderBean.passwordEncoder().encode(newStudent.getPassword()));
        return repository.save(newStudent);
    }

    @PostMapping("/students/email")
    StudentModel addStudentEmailId(@RequestBody Map<String, Object> payload) {

        JSONObject jsonObject = new JSONObject(payload);
        String studentPrimaryEmail = jsonObject.getString("studentPrimaryEmail");
        String studentSecondaryEmail = jsonObject.getString("studentSecondaryEmail");

        StudentModel student = repository.findByStudentPrimaryEmail(studentPrimaryEmail);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ studentPrimaryEmail);
        }

        Set<StudentDetailModel> studentEmails = student.getSecondaryAccountDetails();
        student.addSecondaryStudentEmail(studentSecondaryEmail);

        return repository.save(student);
    }

    @GetMapping("/students/email/{studentPrimaryEmail}")
    Set<StudentDetailModel> getStudentEmailId(@PathVariable String studentPrimaryEmail) {

        StudentModel student = repository.findByStudentPrimaryEmail(studentPrimaryEmail);
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+ studentPrimaryEmail);
        }

        Set<StudentDetailModel> studentEmails = student.getSecondaryAccountDetails();

        // remove emails that are not verified
        for (Iterator<StudentDetailModel> i = studentEmails.iterator(); i.hasNext();) {
            StudentDetailModel sd = i.next();
            if (!sd.getIsVerified()) {
                i.remove();
            }
        }

        return studentEmails;
    }

    // Single student
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
                    if (newStudent.getStudentFirstName()!=null){
                        student.setStudentFirstName(newStudent.getStudentFirstName());
                    }
                    if (newStudent.getStudentLastName()!=null){
                        student.setStudentLastName(newStudent.getStudentLastName());
                    }
                    if (newStudent.getVerified().equals(Boolean.TRUE)){
                        student.setVerified(newStudent.getVerified());
                    }
                    if (newStudent.getSecondaryAccountDetails()!=null && newStudent.getSecondaryAccountDetails().size()!=0){

                        if (student.getSecondaryAccountDetails()==null){
                            student.getSecondaryAccountDetails().addAll(newStudent.getSecondaryAccountDetails());
                        }
                        else {
                            for(StudentDetailModel sd: newStudent.getSecondaryAccountDetails()){
                                if (!student.getSecondaryAccountDetails().contains(sd)){
                                    student.getSecondaryAccountDetails().add(sd);
                                }
                            }
                        }
                    }
                    return repository.save(student);
                })
                .orElseThrow(() -> new IllegalStudentException("Cannot find student with email: "+ email));
    }

    @PutMapping("/students/{email}/passwordchange")
    StudentModel updatePassword(@RequestBody PasswordModel passwordModel, @PathVariable String email) {

        return repository.findById(email)
                .map(student -> {
                    if (PasswordEncoderBean.passwordEncoder().matches(passwordModel.getCurrentPassword(),student.getPassword())){
                        student.setPassword(PasswordEncoderBean.passwordEncoder().encode(passwordModel.getNewPassword()));
                        return repository.save(student);
                    }
                    else {
                        throw new AuthenticationException("Incorrect current password entered. Not authorized.");
                    }
                })
                .orElseThrow(() -> new IllegalStudentException("Cannot find student with email: "+ email));
    }

    @PostMapping("/students/login")
    LoginResponse authenticateStudent(@RequestBody StudentModel model) {

        StudentModel student = repository.findByStudentPrimaryEmail(model.getStudentPrimaryEmail());
        if (student == null){
            throw new IllegalStudentException("Cannot find student with email: "+model.getStudentPrimaryEmail());
        }
        if (student.getVerified() == Boolean.FALSE){
            throw new IllegalStudentException("Student with email: " + model.getStudentPrimaryEmail() + " is not verified.");
        }
        if (!PasswordEncoderBean.passwordEncoder().matches(model.getPassword(),student.getPassword())){
            throw new AuthenticationException("Incorrect password entered. Cannot authenticate.");
        }
        LoginResponse loginResponse = new LoginResponse(student.getStudentPrimaryEmail(), student.getSecret(),student.getSecondaryAccountDetails());
        return loginResponse;
    }

    @Data
    private static class LoginResponse implements Serializable {
        String studentPrimaryEmail;
        String secret;
        Set<StudentDetailModel> secondaryAccountDetails;

        LoginResponse(String studentPrimaryEmail, String secret, Set<StudentDetailModel> set){
            this.studentPrimaryEmail = studentPrimaryEmail;
            this.secret = secret;
            if(set != null) {
                this.secondaryAccountDetails.addAll(set);
            }
        }
    }
}