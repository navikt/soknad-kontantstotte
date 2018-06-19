const pingBackend = () => (
    fetch(hentRestApiUrl() + '/status/isAlive').then((response) => {
        if (response.status === 401) {
            redirectTilLogin();
            return;
        }
        return response.json();
    })
);

const redirectTilLogin = () => {
    window.location.href =
        hentLoginUrl() + '?redirect=' + window.location.href;
};

// TODO: Disse bør inn i fasitvariabler
const hentLoginUrl = () => {
    if (window.location.hostname.indexOf('kontantstotte.nav.no') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    } else if (window.location.hostname.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/soknad-kontantstotte-api/local/cookie';
    } else {
        // Preprod
        return 'https://loginservice-q.nav.no/login';
    }
};

// TODO: Bedre håndtering av dev vs prod-profil -evt bruke pus-decorator sin proxy når den blir klar
const hentRestApiUrl = () => {
    if (window.location.hostname.indexOf('localhost') > -1) {
        return 'http://localhost:8080/soknad-kontantstotte-api';
    }
    return window.location.origin + '/soknad-kontantstotte-api';
};

const Api = { pingBackend };
export default Api;
