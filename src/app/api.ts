import axios from 'axios';
import Environment from '../Environment';

function pingBackend() {
    return axios.get(`${Environment().apiUrl}/status/ping`, {
        withCredentials: true,
    });
}

const redirectTilLogin = () => {
    window.location.href = Environment().loginUrl + '?redirect=' + window.location.href;
};

export { pingBackend, redirectTilLogin };
