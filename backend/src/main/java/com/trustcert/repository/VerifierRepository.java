package com.trustcert.repository;

import com.trustcert.model.VerifierModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

public interface VerifierRepository extends MongoRepository<VerifierModel, String> {
    VerifierModel findByVerifierPrimaryEmail(String verifierPrimaryEmail);
}