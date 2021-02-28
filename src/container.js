/* function fill(){
  var url = "http://localhost:2000/news";
  return $.ajax({
    dataType: 'jsonp',
    url: url,
    async: true,
});
 
}
fill().done(function(result){
  document.getElementById("container").innerHTML="Title "+result.title;
}); */

$(function(){
  $.ajax({
      url: "http://localhost:2000/news",
      contentType: "application/json",
      success: function(response){
        console.log(response);
      }
    });
  });