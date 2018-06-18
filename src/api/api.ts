const REST_API_URL: string =  "http://localhost:8080/soknad-kontantstotte-api";

const pingBackend = () => (
    fetch(REST_API_URL).then((response) => {
        if (response.status == 401) {
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
    if (window.location.href.indexOf('kontantstotte.nav.no') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login'
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/soknad-kontantstotte-api/local/cookie'
    } else {
        // Preprod
        return 'https://loginservice-q.nav.no/login'
    }
};

const Api = { pingBackend };
export default Api;
