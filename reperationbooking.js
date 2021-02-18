const fetch = require('node-fetch');

fetch('https://192.168.0.9/getUnbookedReperation')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => console.log(err));