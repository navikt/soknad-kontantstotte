import axios from 'axios';
import Environment from '../Environment';

function fetchPerson() {
    return axios
        .get(`${Environment().apiUrl}/person`, {
            withCredentials: true,
        })
        .then(response => {
            return response.data;
        });
}

export { fetchPerson };
