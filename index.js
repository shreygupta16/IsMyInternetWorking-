const express = require("express");
const path = require('path');

const app = express();

app.use(express.json());

var flag = false;

async function fetchData() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
      const data = await response.json();
      console.log(data);
      flag = true;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setTimeout(fetchData, 10000);
    }
  }

app.get("/", (req, res) => {
    // res.send("<h2>Hi There!!, waiting for internet...</h2>");
    fetchData();
    if(flag){
        res.redirect('/yippee');
    }
    else{
        console.log(flag);
    }
})

app.get("/yippee", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

const port = 3000;

app.listen(port, () => console.log(`listening on port ${port}`));