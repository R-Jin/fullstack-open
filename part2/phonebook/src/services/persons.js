import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
            .get(baseUrl)
            .then(response => response.data)
}

const createPerson = (personObj) => {
    return axios
            .post(baseUrl, personObj)
            .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, personObj) => {
    return axios
            .put(`${baseUrl}/${id}`, personObj)
            .then(response => response.data)
}

export default {
    getAll,
    createPerson,
    deletePerson,
    updatePerson,
}