   const apiKey = '20d4dc3217e588ef005ec4fdb7983a97'; // Replace with your API key

    function getWeather() {
      let city = document.getElementById('cityInput').value.trim();
      if (!city) return alert("Please enter a city");
      city = capitalFirstLetter(city);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error("City not found");
          return response.json();
        })
        .then(data => {
          const name = data.name;
          const country = data.sys.country;
          const temp = data.main.temp;
          const feelsLike = data.main.feels_like;
          const humidity = data.main.humidity;
          const pressure = data.main.pressure;
          const windSpeed = data.wind.speed;
          const windDeg = data.wind.deg;
          const cloudCover = data.clouds.all;
          const weatherMain = data.weather[0].main;
          const weatherDesc = data.weather[0].description;
          const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
          const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

          document.getElementById('result').innerHTML = `
            <h2>📍 ${name}, ${country}</h2>
            <p>🌤️ Weather: ${weatherMain} (${weatherDesc})</p>
            <p>🌡️ Temp: ${temp}°C (Feels like: ${feelsLike}°C)</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>🔵 Pressure: ${pressure} hPa</p>
            <p>🌬️ Wind: ${windSpeed} m/s, Direction: ${windDeg}°</p>
            <p>☁️ Cloudiness: ${cloudCover}%</p>
            <p>🌅 Sunrise: ${sunrise}</p>
            <p>🌇 Sunset: ${sunset}</p>
          `;
        })
        .catch(error => {
          document.getElementById('result').innerHTML = "❌ City not found";
        });
    }

    function capitalFirstLetter(city) {
      const a = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
    }

    document.getElementById('darkModeToggle').addEventListener('change', function () {
      document.body.classList.toggle('dark', this.checked);
    });