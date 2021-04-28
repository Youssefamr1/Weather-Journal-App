const apiUrl = 'http://localhost:8000/';
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const port = 8000;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, ()=>{console.log(`server running on: http://localhost:${port}`);
});

app.get('/getAll', (request,response)=>{
    response.send(projectData);
});

app.post('/postData', (request,response)=>{
    projectData={
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    };
    response.send(projectData);
});