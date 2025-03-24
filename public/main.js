function update() {
    const button = document.getElementById("locate")
    const loading = document.querySelector(".ldio-x2uulkbinbj div")
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
        button.style.display = "none"
        loading.style.display = "block"
        getWeather(value, name1, country1, state1, latitude1, longitude1, button, loading)
    }
}

async function getWeather(value, name1, country1, state1, latitude1, longitude1, button, loading) {
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

        button.style.display = "block"
        loading.style.display = "none"
        console.log("server-side handshake success")
    } catch (error) {
        console.error(error)
        button.style.display = "block"
        loading.style.display = "none"
        console.log('error to handshake with server-side')
    }
}
