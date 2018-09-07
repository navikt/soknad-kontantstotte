import axios from 'axios';
import Environment from '../Environment';

function fetchTekster(valgtSprak: string) {
    return axios.get(`${Environment().apiUrl}/tekster/${valgtSprak}`).then(response => {
        return response.data;
    });
}

export { fetchTekster };
