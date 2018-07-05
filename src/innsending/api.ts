import axios from 'axios';
import Environment from '../Environment';
import { ISoknad } from './soknad';

function sendInnSoknad(soknad: ISoknad) {
    return axios.post(`${Environment().apiUrl}/sendinn`, JSON.stringify(soknad), {
        headers: {
            'content-type': 'application/json'
        },
        withCredentials: true
    });
}

export { sendInnSoknad };
