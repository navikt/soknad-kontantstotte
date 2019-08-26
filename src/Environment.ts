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
            loginUrl: 'http://localhost:8080/local/cookie',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
        };
    } else if (
        window.location.hostname.indexOf('soknad-kontantstotte-e2e') > -1 ||
        window.location.hostname.indexOf('localhost') > -1
    ) {
        return {
            apiUrl: 'http://localhost:8000/api',
            loginUrl: '',
            papirsoknad: '',
            saksoversikt: '',
        };
    } else if (window.location.hostname.indexOf('ci-test-server') > -1) {
        return {
            apiUrl: '/soknad-kontantstotte-api/api',
            loginUrl: 'http://localhost:8080/local/cookie',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
        };
    } else if (window.location.hostname.indexOf('soknad-kontantstotte-t') > -1) {
        return {
            apiUrl: 'https://soknad-kontantstotte-api-t.nav.no/api',
            loginUrl: 'https://loginservice-q.nav.no/login',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester-t11.nav.no/saksoversikt/app',
        };
    } else if (window.location.hostname.indexOf('soknad-kontantstotte-q') > -1) {
        return {
            apiUrl: 'https://soknad-kontantstotte-api-q.nav.no/api',
            loginUrl: 'https://loginservice-q.nav.no/login',
            papirsoknad:
                'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
            saksoversikt: 'https://tjenester-q0.nav.no/saksoversikt/app',
        };
    }

    return {
        apiUrl: 'https://soknad-kontantstotte-api.nav.no/api',
        loginUrl: 'https://loginservice.nav.no/login',
        papirsoknad:
            'https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/skjemaveileder/vedlegg?key=235029&veiledertype=privatperson&method=mail',
        saksoversikt: 'https://tjenester.nav.no/saksoversikt/app',
    };
};

export default Environment;
