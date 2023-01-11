import axios from "axios";
import { useState } from "react";
import Country from "./components/Country";
import ShowButton from "./components/ShowButton";

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [countryToDisplay, setCountryToDisplay] = useState()
  const [show, setShow] = useState(false)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setShow(show ? !show : show)
    axios
      .get("https://restcountries.com/v2/all")
      .then(res => {
        setCountries(res.data.filter(country => country.name.toLowerCase().includes(search)));
      })
  }

  let searchResult

  if (countries.length > 10) {
    searchResult = <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    searchResult = show ? <Country country={countryToDisplay} /> : <div>{countries.map(country => <p key={country.name}>{country.name} <ShowButton country={country} setCountryToDisplay={setCountryToDisplay} setShow={setShow} /></p>)}</div>
  } else if (countries.length === 1) {
    searchResult = <Country country={countries[0]} />
  }

  return (
    <div>
      <p>Find countries: <input value={search} onChange={handleSearchChange}/></p>
      {/* Display countries here */}
      <div>
      {searchResult}
      </div>
    </div>
  );
}

export default App;