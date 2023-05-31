import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const createPerson = personObject => {
    const request = axios.post(baseUrl, personObject)
    return request.then(res => res.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    request.then(res => {
        console.log(res)
    })
}

const updatePerson = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(res => res.data)
}

const personServices = { getAllPersons, createPerson, deletePerson, updatePerson }

export default personServices