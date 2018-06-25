import axios from 'axios';
import Environment from '../Environment';

const pingBackend = () => (
    axios.get(`${Environment().apiUrl}/status/ping`, {
        withCredentials: true
    }).then((response) => response.data
    ).catch((error) => {
        if (error.response.status === 401) {
            redirectTilLogin();
            return;
        }
    }));

const redirectTilLogin = () => {
    window.location.href =
        Environment().loginUrl + '?redirect=' + window.location.href;
};

const Api = {pingBackend};
export default Api;
