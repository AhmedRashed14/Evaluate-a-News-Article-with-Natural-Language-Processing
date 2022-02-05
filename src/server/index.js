// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const baseurl='https://api.meaningcloud.com/sentiment-2.1?'
const path = require('path')
// Require Express to run server and routes
const express = require('express')
// to use fetch of node
const fetch = require('node-fetch');
const bodyParser=require('body-parser');
const mockAPIResponse = require('./mockAPI.js')
// Start up an instance of app
const app = express()
//to set up the environment variables
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.apiKey
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Server is Working on port 8081!')
})
app.post('/apiRequest', async (req,res) =>{
  projectData = req.body.url;
  const response =await fetch(`${baseurl}key=${apiKey}&url=${projectData}&lang=en`)
  const apiData= await response.json()
  res.send(apiData)
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
