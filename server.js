import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch"; // Use ES Module syntax for node-fetch
import dotenv from "dotenv";

dotenv.config();

let projectData = {}; // Declare projectData

const app = express();

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("docs"));

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// Routes
app.get("/all", (req, res) => {
    res.send(projectData);
});

app.post("/addData", (req, res) => {
    projectData = req.body;
    res.send({ message: "Data received successfully", data: projectData });
});

app.get("/weather", async (req, res) => {
    const zip = req.query.zip;
    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

    console.log("Fetching weather data from URL:", weatherUrl);

    try {
        const response = await fetch(weatherUrl); // Fetch data from OpenWeather API
        const data = await response.json();

        console.log("Weather data received:", data);

        if (data.cod !== 200) {
            return res.status(400).send({ error: data.message });
        }

        res.send(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});
