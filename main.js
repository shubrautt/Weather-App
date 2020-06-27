const api = {
    key: "7894e4b537169089f63bb25efb31c10c",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector(".Search-box");
searchbox.addEventListener('keypress',setQuery);

function  setQuery(evt) {
    if(evt.keyCode == 13){
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResult);
}

function displayResult(weather) {
    let city = document.querySelector(".city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;
    
    let weather_el = document.querySelector(".weather");
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector(".hiLow");
    hilow.innerText = `${weather.main.temp_min}℃/${weather.main.temp_max}℃`
    
}

function dateBuilder(d) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}