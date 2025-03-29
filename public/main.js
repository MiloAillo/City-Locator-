const cityName = document.getElementById("cityName")
const cityCountry = document.getElementById("cityCountry")
const cityState = document.getElementById("cityState")
const cityLat = document.getElementById("cityLatitude")
const cityLon = document.getElementById("cityLongitude")
const cityInput = document.getElementById("cityInput")
const coorName = document.getElementById("coorName")
const coorCountry = document.getElementById("coorCountry")
const coorState = document.getElementById("coorState")
const coorLat = document.getElementById("coorLatitude")
const coorLon = document.getElementById("coorLongitude")
const coorInputLat = document.getElementById("inputLat")
const coorInputLon = document.getElementById("inputLon")

// Logic
let isByCity = true
let isByCoor = false

// Map Visualization
let mapAdd
let marker
let markerCity

// menu toggle
const buttonCity = document.getElementById("buttonByCity")
const buttonLang = document.getElementById("buttonByLang")
const byCity = document.getElementById("byCity")
const byCoor = document.getElementById("byLang")

buttonCity.addEventListener("click", clickCity)
buttonLang.addEventListener("click", clickLang)

function clickCity() {
    buttonCity.style.backgroundColor = "rgba(0, 0, 0, 0)"
    buttonCity.style.boxShadow = "none"
    buttonCity.style.color = "black"
    buttonLang.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonLang.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonLang.style.color = "rgba(0, 0, 0, 0.387)"
    byCity.style.display = "block"
    byCoor.style.display = "none"
    isByCity = true
    isByCoor = false
    cityInput.value = ""
    cityName.innerHTML = ""
    cityCountry.innerHTML = ""
    cityState.innerHTML = ""
    cityLat.innerHTML = ""
    cityLon.innerHTML = ""
}

function clickLang() {
    buttonLang.style.backgroundColor = "rgba(0, 0, 0, 0)"
    buttonLang.style.boxShadow = "none"
    buttonLang.style.color = "black"
    buttonCity.style.backgroundColor = "rgba(29, 29, 29, 0.184)"
    buttonCity.style.boxShadow = "0 -1px 0px 0 rgba(0, 0, 0, 0.204) inset"
    buttonCity.style.color = "rgba(0, 0, 0, 0.387)"
    byCoor.style.display = "block"
    byCity.style.display = "none"
    isByCity = false
    isByCoor = true
    coorInputLat.value = ""
    coorInputLon.value = ""
    coorName.innerHTML = ""
    coorCountry.innerHTML = ""
    coorState.innerHTML = ""
    coorLat.innerHTML = ""
    coorLon.innerHTML = ""
}



// Locate Button
function update() {
    if (isByCity) {
        cityName.innerHTML = ""
        cityCountry.innerHTML = ""
        cityState.innerHTML = ""
        cityLat.innerHTML = ""
        cityLon.innerHTML = ""

        const value = cityInput.value
        if(value === "") {
            cityInput.placeholder = "please, enter a city"
        } else {
            getByCity(value, cityName, cityCountry, cityState, cityLat, cityLon)
        }
    } else if (isByCoor) {
        coorName.innerHTML = ""
        coorCountry.innerHTML = ""
        coorState.innerHTML = ""
        coorLat.innerHTML = ""
        coorLon.innerHTML = ""

        const valueLat = coorInputLat.value
        const valueLon = coorInputLon.value
        if(valueLat === "" || valueLon === "") {
            coorInputLat.placeholder = "please, enter a latitude"
            coorInputLon.placeholder = "please, enter a longitude"
        } else {
            getByCoor(valueLat, valueLon, coorName, coorCountry, coorState, coorLat, coorLon)
        }
    }
}

async function getByCity(value, cityName, cityCountry, cityState, cityLat, cityLon) {
    if (marker) {
        marker.remove()
    }
    if (markerCity) {
        markerCity.remove()
    }
    try {
        const city = encodeURIComponent(value)
        const response = await fetch(`/reqbycity?city=${city}`)
        const json = await response.json()
        const {name, lat, lon, country, state} = json[0]
        cityName.innerHTML = `${name}`
        cityLat.innerHTML = `${lat}`
        cityLon.innerHTML = `${lon}`
        cityCountry.innerHTML = `${country}`
        cityState.innerHTML = `${state}`

        console.log("server-side handshake success")
        mapVisualization(lat, lon)
    } catch (error) {
        console.error(error)
        console.log('error to handshake with server-side')
    }
}

async function getByCoor(valueLat, valueLon, coorName, coorCountry, coorState, coorLat, coorLon) {
    if (marker) {
        marker.remove()
    }
    if (markerCity) {
        markerCity.remove()
    }
    try {
        const lat = encodeURIComponent(valueLat)
        const lon = encodeURIComponent(valueLon)
        const response = await fetch(`/reqbycoor?lat=${lat}&lon=${lon}`)
        const json = await response.json()
        const {name, lat: latitude, lon: longitude, country, state} = json[0]
        coorName.innerHTML = `${name}`
        coorLat.innerHTML = `${latitude}`
        coorLon.innerHTML = `${longitude}`
        coorCountry.innerHTML = `${country}`
        coorState.innerHTML = `${state}`

        console.log("server-side handshake success")
        mapVisualization(valueLat, valueLon)
        markerCity = L.marker([latitude, longitude]).addTo(mapAdd);
        markerCity.bindPopup(`Nearest City`)
    } catch (error) {
        console.error(error)
        console.log('error to handshake with server-side')
    }
}

// Geolocation Feature
const result = document.getElementById('geoResult')

const geolocate = () => {
    cityInput.value = ""
    coorInputLat.value = ""
    coorInputLon.value = ""
    const locate = navigator.geolocation
    if (locate) {
        locate.getCurrentPosition(success, error)
    } else {
        alert("Locate Self is Currently Unavailable")
    }
}

const success = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    if (marker) {
        marker.remove()
    }
    if (markerCity) {
        markerCity.remove()
    }
    try {
        const response = await fetch(`/reqbycoor?lat=${latitude}&lon=${longitude}`)
        const json = await response.json()
        console.log(json)
        const {name, lat, lon, country, state} = json[0]
        coorName.innerHTML = `${name}`
        coorLat.innerHTML = `${lat}`
        coorLon.innerHTML = `${lon}`
        coorCountry.innerHTML = `${country}`
        coorState.innerHTML = `${state}`
        cityName.innerHTML = `${name}`
        cityLat.innerHTML = `${lat}`
        cityLon.innerHTML = `${lon}`
        cityCountry.innerHTML = `${country}`
        cityState.innerHTML = `${state}`
        console.log("server-side handshake success")

        mapVisualization(latitude, longitude)
        markerCity = L.marker([lat, lon]).addTo(mapAdd);
        markerCity.bindPopup(`Nearest City`)
    } catch (error) {
        console.error(error)
        console.log('error to handshake with server-side')
    }
}

const error = () => {
    alert("Unable to retrieve your location")
}

// Map Visualization Feature
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