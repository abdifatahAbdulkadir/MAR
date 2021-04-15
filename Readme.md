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

