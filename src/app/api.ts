import axios from 'axios';
import Environment from '../Environment';

function pingBackend() {
    return axios
        .get(`${Environment().apiUrl}/status/ping`, {
            withCredentials: true,
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            if (error.response.status === 401) {
                redirectTilLogin();
                return;
            }
        });
}

function fetchPersonInfo() {
    return axios.get(`${Environment().apiUrl}/person`);
}

const redirectTilLogin = () => {
    window.location.href = Environment().loginUrl + '?redirect=' + window.location.href;
};

export { pingBackend, fetchPersonInfo };
