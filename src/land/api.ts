import axios from 'axios';
import { ISprak } from '../app/types';
import Environment from '../Environment';

function fetchLand(valgtSprak: ISprak) {
    return axios.get(`${Environment().apiUrl}/land/${valgtSprak}`).then(response => {
        return response.data;
    });
}

export { fetchLand };
