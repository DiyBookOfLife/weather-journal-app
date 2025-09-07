// -----------------------------
// API base (dev vs prod)
// -----------------------------
const API =
  location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://weather-journal-api.onrender.com";

function notify(msg) {
  alert(msg);
}
// -----------------------------
// Backend calls
// -----------------------------
async function getWeatherData(zip) {
  try {
    const res = await fetch(`${API}/weather?zip=${encodeURIComponent(zip)}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      // Server returned an HTTP error (e.g., 400/404)
      const text = await res.text().catch(() => "");
      throw new Error(`Weather request failed (${res.status}): ${text}`);
    }
    return await res.json();
  } catch (err) {
    console.error("getWeatherData error:", err);
    throw err;
  }
}

async function postData(url = "", data = {}) {
  try {
    const res = await fetch(`${API}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`POST ${url} failed (${res.status}): ${text}`);
    }
    return await res.json();
  } catch (err) {
    console.error("postData error:", err);
    throw err;
  }
}

async function fetchLatest() {
  try {
    const res = await fetch(`${API}/all`, { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GET /all failed (${res.status}): ${text}`);
    }
    return await res.json();
  } catch (err) {
    console.error("fetchLatest error:", err);
    throw err;
  }
}

// -----------------------------
// UI update
// -----------------------------
async function updateUI() {
  try {
    const data = await fetchLatest();

    // Guard if the object is empty
    const date = data?.date ?? "";
    const temperature = data?.temperature ?? "";
    const userResponse = data?.userResponse ?? "";

    document.getElementById("date").textContent = date ? `Date: ${date}` : "";
    document.getElementById("temp").textContent =
      temperature !== "" ? `Temperature: ${temperature}°C` : "";
    document.getElementById("content").textContent = userResponse
      ? `Feelings: ${userResponse}`
      : "";
  } catch (err) {
    // Subtle failure fallback — don’t block user
    console.error("updateUI error:", err);
  }
}

// -----------------------------
// Generate click handler
// -----------------------------
document.getElementById("generate").addEventListener("click", async () => {
  const zip = document.getElementById("zip").value.trim();
  const feelings = document.getElementById("feelings").value.trim();

  // Basic ZIP validation (US 5-digit)
  if (!/^\d{5}$/.test(zip)) {
    notify("Please enter a valid 5-digit US ZIP code.");
    return;
  }

  try {
    // 1) Get weather
    const weather = await getWeatherData(zip);

    if (!weather || !weather.main) {
      notify("Invalid ZIP code or weather not available for this area.");
      return;
    }

    // 2) Build entry payload
    const now = new Date();
    const entry = {
      temperature: weather.main.temp,
      date: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
      userResponse: feelings,
    };

    // 3) Save to backend
    await postData("/addData", entry);

    // 4) Refresh UI
    await updateUI();
  } catch (err) {
    notify(
      "The server might be waking up or unavailable. Please wait a few seconds and try again."
    );
  }
});

updateUI();
