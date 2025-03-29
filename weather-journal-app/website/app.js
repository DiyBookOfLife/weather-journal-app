// Global Variables
// Base URL for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Personal API Key (api key format was concluded under 'format' section, the format isn't listed but conclusion based on the URL)
const apiKey = "&appid=b737677c7f686b5f2956cfd3803cadf8&units=imperial";

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
    // Construct full API URL
    const url = baseURL + zip + apiKey;
    console.log("Fetching URL:", url);
    try {
        const response = await fetch(url); // Fetch data from API
        const data = await response.json(); // Convert response to JSON
        return data; // Return data to be used elsewhere
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// Function to send data to the server
const postData = async (url = "", data = {}) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data), // Convert data to JSON
        });
        return await response.json(); // Return server response
    } catch (error) {
        console.error("Error posting data:", error);
    }
};

// Function to update the UI dynamically
const updateUI = async () => {
    try {
        const response = await fetch("/all"); // Fetch stored data from server
        const data = await response.json(); // Convert response to JSON
        
        // Update DOM elements with new data
        document.getElementById("date").innerHTML = `Date: ${data.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${data.temperature}°C`;
        document.getElementById("content").innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.error("Error updating UI:", error);
    }
};

// Event listener for the 'Generate' button
document.getElementById("generate").addEventListener("click", async () => {
    const zip = document.getElementById("zip").value; // Get zip input
    const feelings = document.getElementById("feelings").value; // Get feelings input
    
    if (!zip) {
        alert("Please enter a zip code");
        return;
    }
    
    const weatherData = await getWeatherData(zip); // Fetch weather data
    
    if (weatherData && weatherData.main) {
        // Get current date
        let date = new Date();
        let newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        
        // Prepare data object - consolidate the relevant info 
        const data = {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings,
        };
        
        await postData("/addData", data); // Send data to server
        await updateUI(); // Update UI with new data
    } else {
        alert("Invalid zip code. Please try again.");
    }
});
