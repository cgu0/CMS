What has been done:

1. Established the structure of the project.

- common
  logger.js - creating and configuring a Winston logger. Winston is a popular logging library in Node.js used for logging messages within an application.

  morgan.js - configured to log various details of the incoming requests, such as the HTTP method, URL, status code, response time, and more.

    - utils
        - used for connecting databse
    
    - exceptions
        - notFound : used to represent cases where something expected is not found, typically used in scenarios like database queries where a record or resource is expected to exist but is not found.

- config 
    - configuring and loading environment variables using the dotenv package, and it combines both optional and required configuration options for a Node.js application.

- controllers
    - course.controller.js: Manage the CRUD operations of the courses
    - student.controller.js: Manage the CRUD operations of the students