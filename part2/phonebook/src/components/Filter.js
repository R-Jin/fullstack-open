import { useState } from "react"

const Filter = ({search, setSearch, setFilter}) => {

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setFilter(event.target.value !== "")
    }

    return (
      <div>Filter shown with: <input value={search} onChange={handleSearchChange}/></div>
    )
}

export default Filter