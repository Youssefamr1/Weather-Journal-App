
const apiKey = '&appid=25497e53cd981474f6fc36682c843a45&units=imperial'


const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type == "click") {
        getData(search.value);
        console.log(search.value);
    }
}

function getData () {
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${search.value}${apiKey}`)
        .then(response => {
            return response.json();
        }).then(displayData);
        
}

async function displayData (response) {
    // console.log(response);
    if (response.cod === "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value = "";
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;

        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C`;

        const feelingsCodeElement = document.getElementById('feelings');
        const contentElement = document.querySelector('.content');
        contentElement.innerHTML = `My Feelings is: ${feelingsCodeElement.value}`;



        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}