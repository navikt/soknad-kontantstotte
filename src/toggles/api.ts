import axios from 'axios';
import Environment from '../Environment';
import { IToggleName } from './types';

function fetchToggles() {
    const toggleNames = Object.values(IToggleName).join('&feature=');

    return axios.get(`${Environment().apiUrl}/feature?feature=${toggleNames}`).then(response => {
        return response.data;
    });
}

export { fetchToggles };
