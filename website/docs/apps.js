
const getWeatherData = async (zip) => {
    try {
        const response = await fetch(`/weather?zip=${zip}`); // Call backend route
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
    // Get ZIP code and feelings input from the form
    const zip = document.getElementById("zip").value; // Input field for ZIP code
    const feelings = document.getElementById("feelings").value; // Input field for feelings
    
    // Debugging: Log ZIP and feelings values to check their inputs
    console.log("ZIP entered:", zip); // Check if ZIP code is being retrieved correctly
    console.log("Feelings entered:", feelings); // Check if feelings input is being retrieved correctly
    
    // Validate ZIP code input: Show alert if ZIP code is missing
    if (!zip) {
        alert("Please enter a zip code"); // Notify the user about missing ZIP code
        return; // Stop execution if ZIP code is empty
    }

    // Fetch weather data using the provided ZIP code
    const weatherData = await getWeatherData(zip); // Call function to fetch weather data
    
    // Debugging: Log the response from the getWeatherData function
    console.log("Weather data received:", weatherData); // Check the data returned from the backend route

    // Check if weather data is valid and contains the 'main' property
    if (weatherData && weatherData.main) {
        // Get the current date in MM/DD/YYYY format
        const date = new Date();
        const newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        // Consolidate the weather and user data into a single object
        const data = {
            temperature: weatherData.main.temp, // Temperature from API
            date: newDate, // Current date
            userResponse: feelings, // Feelings input from the user
        };

        // Debugging: Log the data object being sent to the server
        console.log("Data sent to the server:", data);

        // Post the consolidated data to the server
        await postData("/addData", data);

        // Update the UI dynamically with the latest data from the server
        await updateUI();
    } else {
        // Notify the user about invalid ZIP code
        alert("Invalid ZIP code. Please try again."); // Show alert for invalid ZIP
    }
});
