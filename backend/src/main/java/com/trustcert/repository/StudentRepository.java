package com.trustcert.repository;

import com.trustcert.model.StudentModel;
import org.springframework.data.mongodb.repository.MongoRepository;

//@RepositoryRestResource(collectionResourceRel = "student", path = "student")
public interface StudentRepository extends MongoRepository<StudentModel, String> {

    //Indexing Methods goes here
    StudentModel findByStudentPrimaryEmail(String studentPrimaryEmail);

}
