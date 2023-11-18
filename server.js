import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let apiKey;

fs.readFile(__dirname + "/private/openWeather_Key.txt", "utf-8", (err, data) => {
    if (err) throw err;
    apiKey = data;
})

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/weather", async (req, res) => {
    try {
        const geo_response = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&appid=${apiKey}`
        );
        const lat = geo_response.data[0].lat;
        const lon = geo_response.data[0].lon;

        const weather_response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
        );

        const days = []
        const list = [0, 8, 16, 24, 32]
        const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]; 
        const today = new Date();

        list.forEach((i) => {
            const day = {
                temp: Math.round(weather_response.data.list[i].main.temp - 273.15),
                feelsLike: Math.round(weather_response.data.list[i].main.feels_like - 273.15),
                tempMin: Math.round(weather_response.data.list[i].main.temp_min - 273.15),
                tempMax: Math.round(weather_response.data.list[i].main.temp_max - 273.15),
                humidity: Math.round(weather_response.data.list[i].main.humidity),
                weather: weather_response.data.list[i].weather,
                windSpeed: weather_response.data.list[i].wind.speed,
                pressure: weather_response.data.list[i].main.pressure,
                weekday: weekday[today.getDay()]
            }
            days.push(day);
            today.setDate(today.getDate() + 1);
        });
        const locals = {
            days: days,
            city: weather_response.data.city.name,
            sunrise: weather_response.data.city.sunrise, 
            sunset: weather_response.data.city.sunset, 
        };
        res.render("index.ejs", locals);
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});