/* Navigation */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const social = document.querySelector('.social-links');
    // get all nav links
    const navLinks = document.querySelectorAll('.nav-links li');
    const socialLinks = document.querySelectorAll('.social-links a');

    // Toggle nav
    burger.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
        social.classList.toggle('nav-active');
        
        // Animate links
        navLinks.forEach((link, index) => {
            // console.log(index);
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`; // add delay at end
            }
        });

        socialLinks.forEach((link, index) => {
            // console.log(index);
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`; // add delay at end
            }
        });

        // Animate burger
        burger.classList.toggle('toggle');
    });

}

/* Weather app */
window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let windSpeed = document.querySelector('.wind-speed');
    let humidityPercentage = document.querySelector('.humidity');
    let degreeSection = document.querySelector('.degree-section');
    let degreeSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            var key = config.mapkey; // Create account to get api key https://openweathermap.org/api

            const proxy = 'https://cors-anywhere.herokuapp.com/'; // use proxy to fix cors on localhost
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(api) 
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temp, humidity} = data.main; // pull out temp and humid from "main" data object
                    const {description, icon, main} = data.weather[0]; // pull out description and icon from "weather array"
                    const {speed} = data.wind;
                    const {country} = data.sys;
                    // Set DOM elements from api
                    temperatureDegree.textContent = Math.floor(temp - 273.15); // convert kelvin to celsius and remove extra decimal places
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = data.name + ' / ' + country;
                    windSpeed.textContent = speed;
                    humidityPercentage.textContent = humidity;
                    // Set icons
                    setIcons(main, document.querySelector('.icon'));
                });

        });
    } else {
        h1.textContent = 'There has been an error. Please enable geolocation in your browser.';
    }

    function setIcons(main, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = main.toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

// keep it tidy by invoking smaller functions inside of app function
const app = () => {
    navSlide();
}

app();