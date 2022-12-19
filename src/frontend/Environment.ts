interface IEnvUrls {
    apiUrl: string;
    loginUrl: string;
    saksoversikt: string;
    papirsoknad: string;
}

const Environment = (): IEnvUrls => {
    if (process.env.NODE_ENV === 'development') {
        return {
            apiUrl: '/soknad-kontantstotte-api/api',
            // apiUrl: 'http://localhost:8080/api',
            loginUrl: 'http://localhost:8080/local/cookie',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.nav.no/mine-saker',
        };
    } else if (window.location.hostname.indexOf('soknad-kontantstotte-q') > -1) {
        return {
            apiUrl: 'https://soknad-kontantstotte-api-q.nav.no/api',
            loginUrl: 'https://loginservice-q.nav.no/login',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.dev.nav.no/mine-saker',
        };
    } else if (window.location.hostname.indexOf('soknad-kontantstotte-dev-sbs') > -1) {
        return {
            apiUrl: 'https://soknad-kontantstotte-api.dev-sbs.nais.io/api',
            loginUrl: 'https://loginservice.dev.nav.no/login',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.dev.nav.no/mine-saker',
        };
    } else if (window.location.hostname.indexOf('ci-frontend') > -1) {
        return {
            apiUrl: 'http://ci-api-mock:8080/soknad-kontantstotte-api/api',
            loginUrl: 'http://ci-api-mock:8080/login',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.dev.nav.no/mine-saker',
        };
    } else if (window.location.hostname.indexOf('localhost') > -1) {
        return {
            apiUrl: 'http://localhost:8080/soknad-kontantstotte-api/api',
            loginUrl: 'http://localhost:8080/login',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.dev.nav.no/mine-saker',
        };
    } else if (window.location.hostname.indexOf('soknad-kontantstotte.dev') > -1) {
        return {
            apiUrl: 'https://soknad-kontantstotte-api.dev.nav.no/api',
            loginUrl: 'https://loginservice.dev.nav.no/login',
            papirsoknad:
                'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
            saksoversikt: 'https://person.dev.nav.no/mine-saker',
        };
    }

    return {
        apiUrl: 'https://soknad-kontantstotte-api.nav.no/api',
        loginUrl: 'https://loginservice.nav.no/login',
        papirsoknad:
            'https://www.nav.no/soknader/nb/person/familie/kontantstotte/NAV%2034-00.08/brev',
        saksoversikt: 'https://person.nav.no/mine-saker',
    };
};

export default Environment;
