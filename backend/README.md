# Backend 
Details on Backend

Functionalities available for students: 

    1. Get all students (GET: /students)
    2. Add new student (POST: /students)
    3. Retrieve student by primaryEmail (GET: /students/{email})
    4. Update Student Details (PUT: /students/{email}) ##Still needs to be worked on. Also work on adding secondaryEmails
    5. Authenticate Student using primaryEmail and password. (POST: /student/login) #Post request with data in payload
    
To build and run use following command:

    ./mvnw clean spring-boot:run