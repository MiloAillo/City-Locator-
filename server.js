import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`listening to port ${port}`));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/reqbycity', (req, res) => {
    console.log('client-side request arrived!')
    const city = req.query.city;
    console.log(city);
    const value = encodeURIComponent(city)
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=b4a8208e98a19ed3ae422d777f0cf500`
    getWeather(url)

    async function getWeather(url) {
        try {
            const response = await fetch(url)
            const json = await response.json()
            res.send(json)
            console.log('success response has been sent to client')
        } catch (error) {
            console.error(error)
            console.log('error response has been sent to client')
        }
    }
});

app.get('/reqbycoor', (req, res) => {
    console.log('client-side request arrived!')
    const lat = req.query.lat;
    const lon = req.query.lon;
    console.log(lat, lon);
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=b4a8208e98a19ed3ae422d777f0cf500`
    getLocation(url)

    async function getLocation(url) {
        try {
            const response = await fetch(url)
            const json = await response.json()
            res.send(json)
            console.log('success response has been sent to client')
        } catch (error) {
            console.error(error)
            console.log('error response has been sent to client')
        }
    }
})
export default app;
