// menu toggle
const buttonCity = document.getElementById("buttonByCity")
const buttonLang = document.getElementById("buttonByLang")
const buttonZip = document.getElementById("buttonByZip")

buttonCity.addEventListener("click", clickCity)
buttonLang.addEventListener("click", clickLang)
buttonZip.addEventListener("click", clickZip)

function clickCity() {
    buttonCity.style.backgroundColor = "rgba(0, 0, 0, 0)"
    buttonCity.style.boxShadow = "none"
    buttonCity.style.color = "black"
    buttonLang.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonLang.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonLang.style.color = "rgba(0, 0, 0, 0.387)"
    buttonZip.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonZip.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonZip.style.color = "rgba(0, 0, 0, 0.387)"
}

function clickLang() {
    buttonLang.style.backgroundColor = "rgba(0, 0, 0, 0)"
    buttonLang.style.boxShadow = "none"
    buttonLang.style.color = "black"
    buttonCity.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonCity.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonCity.style.color = "rgba(0, 0, 0, 0.387)"
    buttonZip.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonZip.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonZip.style.color = "rgba(0, 0, 0, 0.387)"
}

function clickZip() {
    buttonZip.style.backgroundColor = "rgba(0, 0, 0, 0)"
    buttonZip.style.boxShadow = "none"
    buttonZip.style.color = "black"
    buttonCity.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonCity.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonCity.style.color = "rgba(0, 0, 0, 0.387)"
    buttonLang.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonLang.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonLang.style.color = "rgba(0, 0, 0, 0.387)"
}

// 
function update() {
    const button = document.getElementById("locate")
    const name1 = document.getElementById("name")
    const country1 = document.getElementById("country")
    const state1 = document.getElementById("state")
    const latitude1 = document.getElementById("latitude")
    const longitude1 = document.getElementById("longitude")
    const input = document.getElementById("input")
    name1.innerHTML = ""
    country1.innerHTML = ""
    state1.innerHTML = ""
    latitude1.innerHTML = ""
    longitude1.innerHTML = ""

    const value = input.value
    if(value === "") {
        input.placeholder = "please, enter a city"
    } else {
        getWeather(value, name1, country1, state1, latitude1, longitude1, button)
    }
}

async function getWeather(value, name1, country1, state1, latitude1, longitude1, button) {
    try {
        const city = encodeURIComponent(value)
        const response = await fetch(`/request?city=${city}`)
        const json = await response.json()
        const {name, lat, lon, country, state} = json[0]
        name1.innerHTML = `${name}`
        latitude1.innerHTML = `${lat}`
        longitude1.innerHTML = `${lon}`
        country1.innerHTML = `${country}`
        state1.innerHTML = `${state}`

        console.log("server-side handshake success")
        mapVisualization(lat, lon)
    } catch (error) {
        console.error(error)
        console.log('error to handshake with server-side')
    }
}

// Geolocation Feature
const result = document.getElementById('geoResult')

const geolocate = () => {
    const locate = navigator.geolocation
    if (locate) {
        locate.getCurrentPosition(success, error)
    } else {
        result.innerHTML = "Your system doesn't support this feature"
    }
}

const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    const accuracy = position.coords.accuracy
    result.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}<br>Accuracy: ${accuracy}`
    mapVisualization(latitude, longitude)

}

const error = () => {
    result.innerHTML = `Please allow us to geolocate`
}

// Map Visualization Feature
let mapAdd
let marker
mapAdd = L.map('map').setView([0, 0], 2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapAdd);

function mapVisualization(latitude, longitude) {
        mapAdd.setView([latitude, longitude], 10);
        marker = L.marker([latitude, longitude]).addTo(mapAdd);
        marker.bindPopup(`Your Approximate Location`).openPopup(); 
}