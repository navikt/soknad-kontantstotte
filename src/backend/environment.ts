export default function () {
    if (process.env.ENV === 'prod') {
        return {
            apiUrl: 'http://familie-ba-soknad-api',
            dekoratørUrl: 'https://www.nav.no/dekoratoren/?simple=true',
            port: 9000,
        };
    } else if (process.env.ENV === 'dev') {
        return {
            apiUrl: 'http://familie-ba-soknad-api',
            dekoratørUrl: 'https://www-q1.nav.no/dekoratoren/?simple=true',
            port: 9000,
        };
    } else {
        return {
            apiUrl: 'http://localhost:8080',
            dekoratørUrl: 'https://www.nav.no/dekoratoren/?simple=true',
            port: 3000,
        };
    }
}
