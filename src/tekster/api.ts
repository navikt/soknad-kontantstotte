import axios from 'axios';
import Environment from '../Environment';
import { ISprak } from './types';

function fetchTekster(valgtSprak: ISprak) {
    return axios.get(`${Environment().apiUrl}/tekster/${valgtSprak}`).then(response => {
        return response.data;
    });
}

export { fetchTekster };
