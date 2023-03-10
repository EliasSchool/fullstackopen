import axios from "axios";
const baseUrl = "http://localhost:3001/persons";


const GetPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data)}

const CreatePerson = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => 
        response.data
)}

const deleteContact = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
}

const updateContact = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
    
}

export default { GetPersons, CreatePerson, deleteContact, updateContact }; 