import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountriesNames = () => {
    return axios
        .get(`${baseURL}/all`)
        .then(response => response.data)
        .then(countries => countries.map(country => country.name.common))
}

const getCountryInfo = (countryName) => {
    return axios
        .get(`${baseURL}/name/${countryName}`)
        .then(response => response.data)
        .then(country => (
            {
                name: country.name.common,
                capital: country.capital[0],
                area: country.area,
                languages: Object.values(country.languages),
                flags: country.flags
            }
        ))
}

const getWeatherReport = (capital) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(response => response.data)
        .then(weatherReport => (
            {
                temp: weatherReport.main.temp,
                icon: weatherReport.weather[0].icon,
                wind: weatherReport.wind.speed,
            }
        ))
}

export default {
    getAllCountriesNames,
    getCountryInfo,
    getWeatherReport,
}