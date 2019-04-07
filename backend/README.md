# Backend 
Details on Backend

Functionalities available for students: 

    1. Get all students (GET: /students) ##Temporary
    2. Add new student (POST: /students)
    3. Retrieve student by primaryEmail (GET: /students/{email})
    4. Update Student Details (PUT: /students/{email}) ##Still needs to be worked on. Also work on adding secondaryEmails
    5. Authenticate Student using primaryEmail and password. (POST: /student/login) #Post request with data in payload
    6. Update Password (PUT: /students/{email}/passwordchange)
  
Functionalities available for verifiers: 

    1. Get all verifiers (GET: /verifiers) ##Temporary
    2. Add new verifier (POST: /verifiers)
    3. Retrieve verifier by primaryEmail (GET: /verifiers/{email})
    4. Update verifier Details (PUT: /verifiers/{email}) ##Still needs to be worked on. Also work on adding secondaryEmails
    5. Authenticate verifier using primaryEmail and password. (POST: /verifiers/login) #Post request with data in payload
    6. Update Password (PUT: /verifiers/{email}/passwordchange)
  
  
To build and run use following command:

    ./mvnw clean spring-boot:run