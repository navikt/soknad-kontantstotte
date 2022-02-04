import axios from 'axios';
import Environment from '../Environment';

function fetchSoker() {
    console.log(Environment().apiUrl);
    return axios
        .get(`${Environment().apiUrl}/soker`, {
            withCredentials: true,
        })
        .then(response => {
            return response.data;
        });
}

export { fetchSoker };
