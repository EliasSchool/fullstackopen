import axios from "axios";
const baseUrl = "http://localhost:3001/persons";


const GetPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response =>   response.data)}

const CreatePerson = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => 
        response.data
)}

export default { GetPersons, CreatePerson }