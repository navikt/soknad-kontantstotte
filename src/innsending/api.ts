import axios from 'axios';
import Environment from '../Environment';

function sendInnSoknad(soknad: object) {
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
