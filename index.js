const fetch = require("node-fetch");
require('dotenv').config()
let apiKey = process.env.apikey;

const input_arg = require('yargs').argv;
let city = input_arg.c || 'New Delhi';  // input_arg.c will accept the city from user otherwise "New Delhi" is by default

const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// fetch is used for getting data from the Weather API 

fetch(url,{method:'GET'}).then(text => {
  if (text.ok) {
    return text.json();// here the output or data received on successful execution converted to JSON object
  }
  else{
      console.log(`No such city named ${city}`);
  }
}).then(jsonresp => {
    let temperature=Math.round(jsonresp.main.temp-273);
    let description = jsonresp.weather[0]['description'];
    let country= jsonresp.sys.country;

    console.log(` City : ${city} \n Temperature : ${temperature} Celsius \n Description : ${description} \n Country : ${country} `);
}).catch(error => console.error('Error:', error)) ;
