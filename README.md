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

## How does it work?
![image](https://github.com/Flame338/lms-project/assets/79010252/ae2ae6e2-60f2-4258-90cd-0166b7c24295)
The above page is the landing page which also serves as the document search page. 

At the top, there is a navbar that shows three tabs
- Search
- Update
- About

# Search Mode
Searching is easy, choose the document type & search field then add a search term in the search bar. Hit submit and you'll have info about the document in question

Eg. ![image](https://github.com/Flame338/lms-project/assets/79010252/98f5fc96-7a9b-449c-8eb9-dd88a63bc5f7)
In the above example, we're searching for the book Moby Dick

# Update Mode
Click on the Update Titles tab on the navbar to get redirected to this page
![image](https://github.com/Flame338/lms-project/assets/79010252/3be83add-2dfb-429f-8728-d2e57b72e4fe)
Here, since it's simply used to change the title of a document, the search field here are the document types. To update the name of a title, simply type it's name and hit submit
