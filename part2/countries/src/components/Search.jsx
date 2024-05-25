import { useState } from "react"

const Search = ({setResults, countries}) => {
    const [searchText, setSearchText] = useState("")

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase()
        const searchResults = countries.filter(country => country.toLowerCase().includes(query))
        setResults(searchResults)
        setSearchText(event.target.value)
    }

    return (
      <div>
        find countries
        <input type="text" value={searchText} onChange={handleSearch} />
      </div>
    )
}

export default Search