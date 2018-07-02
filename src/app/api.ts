import axios from 'axios';
import Environment from '../Environment';
import { ISoknad } from "../innsending/soknad";

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
            'content-type': 'multipart/form-data;'
        },
        withCredentials: true
    });
}

function pingBackend() {
    return axios.get(`${Environment().apiUrl}/status/ping`, {
        withCredentials: true
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        if (error.response.status === 401) {
            redirectTilLogin();
            return;
        }
    });
}

const redirectTilLogin = () => {
    window.location.href =
        Environment().loginUrl + '?redirect=' + window.location.href;
};

export { pingBackend, sendInnSoknad };
