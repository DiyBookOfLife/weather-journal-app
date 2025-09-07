// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve the front-end from /docs (index.html, app(s).js, style.css)
app.use(express.static("docs"));

// in-memory store for your journal data
let projectData = {};

// POST /addData  (front-end posts here)
app.post("/addData", (req, res) => {
  projectData = req.body || {};
  res.json({ ok: true, data: projectData });
});

// GET /all  (front-end reads latest entry here)
app.get("/all", (_req, res) => {
  res.json(projectData);
});

// GET /weather?zip=xxxxx  (server calls OpenWeather with your API key)
app.get("/weather", async (req, res) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey)
      return res.status(500).json({ error: "Missing WEATHER_API_KEY" });

    const { zip } = req.query;
    if (!zip)
      return res.status(400).json({ error: "zip query param is required" });

    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${encodeURIComponent(
      zip
    )}&appid=${apiKey}&units=imperial`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok || (data.cod && Number(data.cod) !== 200)) {
      return res
        .status(400)
        .json({ error: data.message || "OpenWeather error" });
    }

    res.json(data);
  } catch (err) {
    console.error("Weather route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
