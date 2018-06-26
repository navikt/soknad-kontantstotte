import axios from 'axios';
import Environment from '../Environment';

function fetchBarn() {
    return axios.get(`${Environment().apiUrl}/barn`)
        .then((response) => {
            return response.data;
        });
}

export {
    fetchBarn
};
