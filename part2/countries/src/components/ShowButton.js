const ShowButton = ({country, setCountryToDisplay, setShow}) => {
    const showCountry = () => {
        setCountryToDisplay(country)
        setShow(true)
    }

    return (
        <button onClick={showCountry}>Show</button>
    )
}

export default ShowButton