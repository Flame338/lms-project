# Library Management System

The Library Management System is made as part of the UST FSD Training Program. The diagram given below illustrates how the front-end & back-end are connected.
    
       Front         Express.js          Back     
        End        <------------>        End      
       (HTML)                            (JS)   
  An overview of all the items included in this repository
  
  | Type | Compoent | Description | 
  |------------|------------|------------|
  | Folders | about   |                             |
  |         | login   |                  Contains html & css files for the respective page            |
  |         | update  |                                                                               |
  | | home | Contains lms.html & html.css |
  |         | success | Contains all html pages that are to be loaded when an operation is successful |
  |         | JSON    | Contains JSON files that store information about it's respective documents |
  | Main Files  | lms.js | Back-end, used to handle various operations like searching for books & journals, updating the name of a document or generating a report |
  |         | lms_utility.js | Custom library to perform above said operations on flat files (i.e., JSON files). |
  |        | lms_mongodb.js | Same thing but using mongodb in case the LMS needs to be scaled up  |
  
 # Dependencies required: 
  1) npm package manager
  2) Express.js
  ```
  npm install express
  ```
  3) body-parser
  ```
  npm install body-parser
  ```
  4) nodemon (alternatively, you could run node lms.js *every single time*)
  ```
  npm install nodemon 
  ```
  
# To run the project locally
1) Go the file where lms.js is located and in the terminal, type
```
npx nodemon lms.js
```
2) Run http://locahost:8000 on your preferred browser

The website is now up for local use!
