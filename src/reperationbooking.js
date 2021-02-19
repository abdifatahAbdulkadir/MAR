
const fetch=require('node-fetch');
async function startFetching(){
  alert("hello");
fetch('http://192.168.0.9:2000/getUnbookedReperation')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let table = document.getElementById("reperationTable")
  generateTableHead(table, data);
  })
  .catch(err => console.log(err)); 
}






  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  startFetching();
 
  
  
  