package com.trustcert.repository;

import com.trustcert.model.EmployeeModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {

    List<EmployeeModel> findByEmployeeEmail(@Param("employeeEmail") String employeeEmail);
}