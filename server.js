import express from 'express';
const app = express()
import dotenv from 'dotenv';
import fetch from 'node-fetch';
const port = process.env.PORT || '3000'
app.listen(port, () => console.log(`listening to port ${port}`));

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const data = []

app.get('/request', (req, res) => {
    console.log('client-side request arrived!')
    const city = req.query.city;
    console.log(city);
    data.push(city)
    const value = encodeURIComponent(city)
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${process.env.API_KEY}`
    getWeather(url)
    console.log("current database: " + data);

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

export default app;
