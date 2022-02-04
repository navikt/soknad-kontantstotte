import axios from 'axios';
import Environment from '../Environment';

function fetchBarn() {
    console.log(Environment().apiUrl);
    return axios
        .get(`${Environment().apiUrl}/barn`, {
            withCredentials: true,
        })
        .then(response => {
            return response.data;
        });
}

export { fetchBarn };
