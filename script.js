async function getWeather() {
  console.log("Button clicked!"); // To check if the function is triggered

  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "5f720f72e74d58dc9f823ba9b7364446";

  if (!city) {
    document.getElementById("weatherOutput").innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  console.log("Fetching weather for:", city);
  console.log("Request URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("API Response:", data);

    if (data.cod === 200) {
      const output = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
      document.getElementById("weatherOutput").innerHTML = output;
    } else {
      document.getElementById("weatherOutput").innerHTML = `<p>${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("weatherOutput").innerHTML = `<p>Error fetching data</p>`;
  }
}
