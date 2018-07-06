import axios from 'axios';
import Environment from '../Environment';
import { ISoknad } from './soknad';

function sendInnSoknad(soknad: ISoknad) {

    const formData = new FormData();
    formData.append(
        'soknad',
        new Blob([JSON.stringify(soknad)], {
            type: 'application/json'
        })
    );
    return axios.post(`${Environment().apiUrl}/sendinn`, formData, {
        headers: {
            'content-type': 'multipart/form-data;',
        },
        withCredentials: true
    });
}

export { sendInnSoknad };
