const express = require("express");
const https = require("https");
const BodyParser = require("body-parser");
const app = express();
app.use(BodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.sendFile(__dirname + ("/index.html"));
    
});


app.post("/", function (req, res) {
    let city = req.body.n1;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=key&units=metric";

    https.get(url, function (response) {

        response.on("data", function (data) {
            let WeatherData = JSON.parse(data);
            
            let temperature = WeatherData.main.temp;
            let feel = WeatherData.main.feels_like;


            res.send(`<h1>The Temperture Of ${city} Is  ${temperature}  Celcius and It Feels Like ${feel} Celcius </h1 `);
            //WE CAN USE RES.SEND ONLY ONCE IN A FUNCTION

        });
    });

});



app.listen(3000, function (req, res) {
    console.log("Server Started At Port 3000");
});
