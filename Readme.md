# MAR
## Languages and Tools Used
><img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/><br> <img alt="jQuery" src="https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white"/> <img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>  <img alt="GitHub" src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/><img alt="Bootstrap" src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white"/> 
---

<br>

## Table of contents 
---
- **[About MAR](#About-MAR)**
- **[File Structure](#File-Structure)**
- **[Architectural Approach](#Architectural-Approach)**
    - **Database structure**
    - **Multiple Page Application (MPA)**
    - **Restful API**
- **[Frontend](#Frontend)**
    - **Ajax**
    - **HTML/CSS & bootstrap**
    - **Error Handler**
- **[Backend](#Backend)**
    - **Server**
    - **Routes**
    - **Middleware** 
    - **MySQL**
<br>

## File Structure
---
<pre>
📦MAR
┃ V 📦src
┃ ┃  > 📂images
┃ ┃  V 📂public
┃ ┃    ┗ 📜booking.css
┃ ┃    ┗ 📜style.css
┃ ┃  V 📂views
┃ ┃   ┗ 📜about.html
┃ ┃   ┗ 📜addArticle.html
┃ ┃   ┗ 📜adminBooking.html
┃ ┃   ┗ 📜adminPage.html
┃ ┃   ┗ 📜bookingReparation.html
┃ ┃   ┗ 📜index.html
┃ ┃   ┗ 📜login.html
┃ ┃   ┗ 📜myBookings.html
┃ ┃   ┗ 📜newArticle.html
┃ ┃   ┗ 📜register.html
┃ ┣ 📜dataBase.js
┃ ┣ 📜route.js
┃ ┣ 📜server.js
┃ ┣ 📜package-lock.json
┃ ┣ 📜package.json
┃ ┣ 📜README.md
┃ ┗ 📜.gitignore
 </pre>



 ## About MAR
---
 > MAR will allow you to book a date for laundry.
- **Admin**
   * Be able to add Announcements
   * Be able to view and delete users and their booked date.
       - > When a user is removed, all related bookings will be removed 
   * Able to logout when finished.
- **User/client**
   * Be able to register.
   * Able to login in with registered credentials.
   * Able to book a date.
   * Able to view clients bookings.
   * View Announcements
   * Able to logout when finished.

   ## Backend
- **Server**
  * Nodejs, a javascript runtime environment is used as a backend together with express.js a backend web app framework. It enables us to handle all the Database and URL path routes and create the RESTFUL API.
  * Require() and Database connectivity :
     1. We call the needed requirements such as express, path for locating the location of all html pages, mysql for setting up the database, apiRouter for requiring the route.js location.
  
    ```
    const express = require("express");
    const app = express();
    const path = require("path");
    const mysql = require("mysql");
    const apiRouter = require("./route");
    ```
 
- **Routes**
  * Routing helps our app to organize and manage the application states, and even make callbacks
  
    ```
    const express = require("express");
    const router = express.Router();
    const data_base = require("./dataBase.js");
 
    router.get("/news", async(req, res) => {
    try {
        let dbResult = await data_base.module.news();
        res.json(dbResult);
        console.log(dbResult);
    } catch (e) {
        console.log(e);
        res.send("500");
     }
    });
 
  * Express Sessions are used to store the user's credential when logged-in. Below we are creating the session secret which we will then use to store the user credentials.
    ```
    app.use(session({
    secret: "secret",
    resave: ncoweuihcskjdfoi,
    saveUninitialized: false
    }));
 
- **MySQL Connectivity**
  * We make connections inside the `server.js & database.js`. Below is we connect to the database:
  
    ```
    const connection = mysql.createConnection({
    host: "localhost",
    user: "***",
    password: "***", 
    database: "***", 
    port: 3306,
    connectionLimit: 10
    }); 



## Frontend
---
- **Ajax**
  * The jQuery is used to fetch data from json to the table. Each table tree is then dynamically generated as more data becomes available
     ``` 
     fetch('http://localhost:3003/booked').then(function (response) {
                return response.json();
            }).then(function (data) {
                appendData(data);
            }).catch(function (err) {
                console.log("error:" + err);
            });
            
            function appendData(data) {
                
                let tbodyContainer = document.getElementById("tb");
                for (let i = 0; i < data.length; i++) {
                    let tr = document.createElement("tr");
                   
                    tr.innerHTML =
                        "<tr class='tr'>" +
                        "<td class='td'>" + data[i].book_id   + "</td>"   +
                        "<td class='td'>" + data[i].descr     + "</td>"   +
                        "<td class='td'>" + data[i].book_date + "</td>"   +
                        `<td class"'td'> <a class="btn_delete" href='/delete?book_id=${data[i].book_id}'>cancel</a></th>`+
                       
                        "</tr>";
 
                    tbodyContainer.appendChild(tr);
                }
            }
    ```
- **HTML/CSS & bootstrap**
  * For login, register and booking interface, bootstrap is used.
  * The rest (the navbar, tables) are designed with HTML/CSS
- **Error Handler**
  * Errors are handled by notifying the user. These Error are
    1. Login/register - The user should enter all fields otherwise different errors with different messages  will be shown. The messages are generated from the server side.
    2. When same date is booked a message is displayed notifying the user ```The date is already been booked```



