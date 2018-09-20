import axios from 'axios';
import Environment from '../Environment';
import { IToggleName } from './types';

function fetchToggles() {
    const toggleNames = Object.values(IToggleName).join('&feature=');

    return axios.get(`/api/feature?feature=${toggleNames}`).then(response => {
        //soknad-kontantstotte.nav.no/api/feat...
        return response.data;
    });
}

export { fetchToggles };
