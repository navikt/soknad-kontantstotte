import axios from 'axios';
import Environment from '../Environment';
import { ISoknadState } from '../soknad/types';

function sendInnSoknad(soknad: ISoknadState) {
    const formData = new FormData();
    formData.append(
        'soknad',
        new Blob([JSON.stringify(soknad)], {
            type: 'application/json',
        })
    );
    return axios.post(`${Environment().apiUrl}/sendinn`, formData, {
        withCredentials: true,
    });
}

export { sendInnSoknad };
