import Environment from '../Environment';

const pingBackend = () => (
    fetch(Environment().apiUrl + '/status/ping').then((response) => {
        if (response.status === 401) {
            redirectTilLogin();
            return;
        }
        return response.json();
    })
);

const redirectTilLogin = () => {
    window.location.href =
        Environment().loginUrl + '?redirect=' + window.location.href;
};

const Api = { pingBackend };
export default Api;
