package com.trustcert.repository;

import com.trustcert.model.UniversityModel;
import org.springframework.data.mongodb.repository.MongoRepository;

//@RepositoryRestResource(collectionResourceRel = "student", path = "student")
public interface UniversityRepository extends MongoRepository<UniversityModel, String> {

    //Indexing Methods goes here
    UniversityModel findByUniversityPrimaryEmail(String universityPrimaryEmail);

}
