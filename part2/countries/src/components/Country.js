import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({country}) => {
    const [temp, setTemp] = useState()
    const [weatherIconCode, setWeatherIconCode] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${api_key}&q=${country.capital}`)
            .then(res => {
                setTemp(res.data.main.temp)
                setWeatherIconCode(res.data.weather[0].icon)
                setWindSpeed(res.data.wind.speed)
            })
    })
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt="Flag of the country"/>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`} alt="Weather Icon"/>
            <p>Wind: {windSpeed} m/s</p>
        </div>
    )
}

export default Country