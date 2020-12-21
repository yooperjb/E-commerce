# E-commerce Back End
![E Commerce](https://img.shields.io/github/languages/top/yooperjb/E-commerce) ![MIT](https://img.shields.io/badge/license-MIT-blue)

## Description
E-commerce back end is a Node.js application using a MySQL database to store, edit, and delete product information for a sample e-commerce application.  

The application has the following features:
* View all products
* View all product categories
* View all product tags
* Edit products
* Edit categories
* Edit tags
* Delete products
* Delete categories
* Delete tags

## Table of Contents
* [Installation Requirements](#install)
* [NPM Packages](#npm)
* [Application Usage](#usage)
* [Tests](#tests)
* [Questions](#questions)

## Preview
A sample video showing the application in action can be viewed [here](https://drive.google.com/file/d/11WW2QnXges_GPkAg4PLw6mY6wf_Z2gI7/view?usp=sharing). The project repository can be found on [github](https://github.com/yooperjb/E-commerce). 

## <a name=install></a>Installation Requirements
Employee Tracker requires [node.js](https://nodejs.org/en/) which must be installed prior to using the application. There are also package dependencies required which can be installed using the following at root:

```
npm install
```
The application uses [MySQL](https://dev.mysql.com/downloads/) database which must also be installed to use. There are schema.sql and seed.sql files that can be used to build and populate a sample working product database.

### <a name=npm></a>NPM Packages
* [mysql2](https://www.npmjs.com/package/mysql2) - MySQL Node.js client
* [dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables
* [express](https://expressjs.com/) - web application framework
* [sequelize](https://www.npmjs.com/package/sequelize) - promise-based Node.js ORM

***
## <a name=usage></a>Application Usage
The application can be cloned from gihub using:
```
git clone https://github.com/yooperjb/E-commerce.git
```
Once all of the dependencies are installed, the database can be built and seeded using the following commands. The first should be executed in the mysql CLI, and the second in node terminal. 
```
source db schema.sql
npm run seed
```
To run the application, from root use:
```
npm start
```
## Tests
No tests were completed yet for this application. 

## Questions
Any questions or feedback regarding this project can be sent directly to my [email](mailto:jason.barnes@humboldt.edu). This project and others can be found at my [Github page]('https://github.com/yooperjb').