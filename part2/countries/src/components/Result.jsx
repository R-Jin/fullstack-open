import CountryPage from "./CountryPage"

const Result = ({ results, setResults }) => {

    const showCountry = (result) => {
        setResults([result])
    }

    if (results.length === 1) {
        return <CountryPage countryName={results[0]} results={results} />
    }
    else if (results.length <= 10) {
        return (
            <>
                {
                    results.map(result => (
                        <div key={result}>
                            {result}
                            <button onClick={() => showCountry(result)}>Show</button>
                        </div>
                    )
                )
                }
            </>
        )
    }
    return (
        <div>Too many matches, specify another filter</div>
    )
}

export default Result