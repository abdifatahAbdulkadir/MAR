/* $(function(){
    let count = 0;
    setInterval(function(){
    $.ajax({
        url: "http://localhost:3003/allUsers",
        type: "GET",
        contentType: "application/json",
        success: function(response){
            if (response.length > 0) {
            console.log(response);
            var tbodyEl = $("#tb");
            tbodyEl.html("");
            response.forEach(function(user){
                tbodyEl.append(`\
                        <tr>\
                           <td> ${user.user_id} </td>\
                           <td> ${user.name} </td>\
                           <td> ${user.email} </td>\
                           <td> ${user.role} </td>\
                        </tr>\
                `);
            }); 
        }else{
            console.log("The database is Empty");
        } 
    }
    });
    }, 3000);
}); */