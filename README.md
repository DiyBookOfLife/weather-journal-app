# Weather-Journal App Project

## Overview

The **Weather-Journal App** is a full-stack project that demonstrates my ability to build an asynchronous web application. It integrates with the **OpenWeather API** and allows users to create journal entries tied to real-time weather data.

This project highlights my skills in:

- **API Integration**
- **Dynamic UI Updates**
- **Asynchronous JavaScript**
- **Node.js + Express Backend Development**
- **Deploying Full-Stack Apps (GitHub Pages + Render)**

The base HTML and CSS were provided by Udacity, but all backend logic, API integration, and functionality—including `server.js` and `app.js`—were fully developed by me.

---

## Features

- Fetch real-time weather data from the **OpenWeather API** based on user input.
- Store and retrieve journal entries linked with weather data.
- Dynamically update the UI with both API results and user input.
- Utilize **async/await** for smooth and efficient asynchronous interactions.
- Fully deployed: frontend on GitHub Pages, backend API on Render.

---

## Live Demo

- **Frontend (GitHub Pages):** [Weather Journal App](https://diybookoflife.github.io/weather-journal-app/)
- **Backend (Render API):** [Weather Journal API](https://weather-journal-api.onrender.com)

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **API**: OpenWeather API
- **Other Tools**: Postman, GitHub, Render

---

## Installation & Usage (Local Setup)

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- OpenWeather API Key (store in `.env` file)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/DiyBookOfLife/weather-journal-app.git
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your API key:
   WEATHER_API_KEY=your_openweather_api_key

4. Start the server:
   ```bash
   node server.js
   ```
5. Open http://localhost:8000 in your browser to start the app.

---

## How It Works

1. User enters a **zip code** and a **journal entry**.
2. The app fetches weather data from the **OpenWeather API** (via backend).
3. Weather data + journal entry are stored in the Express server.
4. The frontend dynamically updates to display the most recent entry.

---

## Contact

For questions or collaboration opportunities, feel free to connect:

- **GitHub**: [DiyBookOfLife](https://github.com/DiyBookOfLife)
- **LinkedIn**: [Toni Thomas](https://www.linkedin.com/in/tonithomas2025)
