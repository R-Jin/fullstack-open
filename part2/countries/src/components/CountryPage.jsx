import { useEffect, useState } from "react"
import countryServices from "../services/countries"

const CountryPage = ({countryName, results}) => {
    const [countryInfo, setCountryInfo] = useState(null)
    const [weatherReport, setWeatherReport] = useState(null)

    useEffect(() => {
        countryServices
            .getCountryInfo(countryName)
            .then(countryInfo => {
                setCountryInfo(countryInfo)

                countryServices
                    .getWeatherReport(countryInfo.capital)
                    .then(weatherReport => {
                        setWeatherReport(weatherReport)
                    })
            })

    }, [results])

    if (countryInfo === null || weatherReport === null) {
        return <></>
    }

    return (
        <>
            <h1>{countryInfo.name}</h1>
            <div>Capital: {countryInfo.capital}</div>
            <div>Area: {countryInfo.area}</div>
            <h4>Languages:</h4>
            <ul>
                {
                    countryInfo.languages.map(language => (
                        <li key={language}>{language}</li>
                    ))
                }
            </ul>
            <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} width={150} />
            <h1>Weather in {countryInfo.name}</h1>
            <div>Temperature: {weatherReport.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weatherReport.icon}@2x.png`} alt="" />
            <div>Wind: {weatherReport.wind} m/s</div>
        </>
    )
}

export default CountryPage