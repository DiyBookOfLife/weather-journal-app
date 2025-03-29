
// Require Express to run server and routes
const express = require ('express');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Configuring express to use body-parser as middle-ware. (I always forget this part)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port,() => {
    console.log(`Server running on localhost:${port}`);
});

// Initialize all routes with a callback function
app.get("/all", (req, res) => {
    res.send(projectData);
});

// Post Route
app.post("/addData", (req, res) => {
    projectData = req.body; // Store incoming data in projectData
    res.send({ message: "Data received successfully", data: projectData });
});
