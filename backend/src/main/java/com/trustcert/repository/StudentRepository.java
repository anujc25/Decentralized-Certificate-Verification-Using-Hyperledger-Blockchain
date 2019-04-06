package com.trustcert.repository;

import com.trustcert.model.StudentModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

//@RepositoryRestResource(collectionResourceRel = "student", path = "student")
public interface StudentRepository extends MongoRepository<StudentModel, String> {

    //Indexing Methods goes here
    StudentModel findByStudentEmail(String studentEmail);

}
