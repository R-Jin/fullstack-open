import { useEffect, useState } from 'react'
import Result from './components/Result'
import countryServices from './services/countries'
import Search from './components/Search'

function App() {

  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    countryServices
      .getAllCountriesNames()
      .then(countriesNames => {
        setCountries(countriesNames)
      })
  }, [])

  return (
    <>
      <Search setResults={setResults} countries={countries} />
      <Result results={results} setResults={setResults} />
    </>
  )
}

export default App
