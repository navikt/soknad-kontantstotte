import axios from 'axios';
import Environment from '../Environment';
import { ISprak } from './types';

function fetchLand(valgtSprak: ISprak) {
    return axios.get(`${Environment().apiUrl}/land/${valgtSprak}`).then(response => {
        return response.data;
    });
}

export { fetchLand };
