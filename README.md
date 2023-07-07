# Library Management System

The Library Management System is made as part of the UST FSD Training Program by Steve Thomas. The diagram given below illustrates how the front-end & back-end are connected. This project is developed in partnership with Navneeth Nair
    
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
  5) express (just incase of migrating files to mongodb)
  ```
  npm install express
  ```
  
# To run the project locally
1) Go the file where lms.js is located and in the terminal, type
```
npx nodemon lms.js
```
2) Run http://locahost:8000 on your preferred browser

The website is now up for local use!

## How does it work?
![how does it work](https://github.com/Flame338/lms-project/assets/79010252/c2e7cd8f-a185-4b2c-a13a-c9c9045e4a7d)

The above page is the landing page which also serves as the document search page. 

At the top, there is a navbar that shows three tabs
- Search
- Update
- About

# Search Mode
Searching is easy, choose the document type & search field then add a search term in the search bar. Hit submit and you'll have info about the document in question
Eg. ![searchMode](https://github.com/Flame338/lms-project/assets/79010252/4b4d7e90-eca5-463e-bc04-64aaf4220f3c)
In the above example, we're searching for the book Moby Dick

# Update Mode
Click on the Update Titles tab on the navbar to get redirected to this page
![updateMode](https://github.com/Flame338/lms-project/assets/79010252/bcec0b6f-1f1d-4cf1-9c42-6b7ce759828f)
Here, since it's simply used to change the title of a document, the search field here are the document types. To update the name of a title, simply type it's name and hit submit

# Report Mode
To see the report of all the documents in the system, simply set all fields of the Search Page as N/A (empty) as so
![reportMode](https://github.com/Flame338/lms-project/assets/79010252/6c231da6-8675-4590-abc5-af2daf597343)
The output is renderred on the same page as so
![reportOutput](https://github.com/Flame338/lms-project/assets/79010252/3050d37e-e539-42c1-8228-8bb558306895)

# Points to improve on:
- Adding a Admin/User roles accorsing to log in credentials
- Making a cleaner UI/UX
- Migrating the project to React using the T3 stack (Tailwind css, Typescript, tRPC) for better development experience
