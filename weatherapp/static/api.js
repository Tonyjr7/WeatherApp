const API_KEY = "e4ba6aac1f1e51a9fbf546d692ae2a18";
let takeInput = document.getElementById('input');
let submitButton = document.getElementById('sub');

// Add event listener for button click
submitButton.addEventListener('click', function () {
    // Get the city name from the input field
    let city_name = takeInput.value;
    let loadingSpinner = document.getElementById('loading-spinner');

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Fetch weather data only if city name is not empty
    if (city_name) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                // Extract data
                let weather = data["weather"];
                let mains = data["main"];
                let wind = data["wind"];
                let timezoneOffset = data["timezone"]; // Timezone offset in seconds
                
                // Access weather data
                let weatherValueMain = weather[0].main;
                let weatherValueDesc = weather[0].description;
                let weatherValueTemp = (mains.temp - 273.15).toFixed(2);
                let weatherValuePressure = mains.pressure;
                let weatherValueHumidity = mains.humidity;
                let weatherValueSpeed = wind.speed;

                 // Get the current time (UTC time)
                let serverTime = new Date();

                // Calculate the local time for the city
                let localTime = new Date(serverTime.getTime() + (timezoneOffset * 1000));

                // Adjust for server time being 1 hour ahead
                let adjustedLocalTime = new Date(localTime.getTime() - (60 * 60 * 1000)); // Subtract 1 hour

                // Calculate the timezone offset in hours
                let offsetHours = timezoneOffset / 3600;

                // Format the local time to a readable string
                let localTimeString = adjustedLocalTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true // Use 12-hour format if preferred
                });

                // Format the timezone offset
                let offsetSign = offsetHours >= 0 ? '+' : '-';
                let offsetString = `GMT${offsetSign}${Math.abs(offsetHours).toString().padStart(2, '0')}`;


                document.getElementById('main').innerText = weatherValueMain;
                document.getElementById('desc').innerText = weatherValueDesc;
                document.getElementById('temp').innerText = weatherValueTemp;
                document.getElementById('pressure').innerText = weatherValuePressure;
                document.getElementById('humid').innerText = weatherValueHumidity;
                document.getElementById('speed').innerText = weatherValueSpeed;
                document.getElementById('time').innerText = `${localTimeString} ${offsetString}`;

                loadingSpinner.style.display = 'none';
            })
            .catch(error => {
                loadingSpinner.style.display = 'none';
                alert("Oops..., Check The City Name You Entered");
            })
    } else {
        alert("Please enter a city name.");
    }
});
