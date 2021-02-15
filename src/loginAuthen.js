const e = require("express");

function check(){
    var username=document.getElementById("usernameid").value;
    var password=document.getElementById("passwordid").value;
    let header = new Headers();   
    localStorage.setItem("username",username);
    localStorage.setItem("password",password);
   
    header.append('Authorization', 'Basic ' + btoa(username + ":" + password));
    header.append('Content-Type', 'application/json');
    fetchresponse(header);

}
async function fetchresponse(header){
   
    try{
     /*define http later*/   
     const response = await fetch('http://nilsson.tech/server-0.0.1/auth', {
        method:"POST",
        mode: "cors",
        headers: header                    
             });
           
 
   if(response.status==200){
       window.location.href=""; //define later
   }else if(response.status==401){
       alert("invalid username or password");
   }else if(respons.status==400){
       alert("request error");
   }else if(response.status==500){
       alert("internal server error");
   }
}catch(err){
    alert(err);
}
}