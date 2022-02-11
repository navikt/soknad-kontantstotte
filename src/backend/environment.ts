export default function () {
    if (process.env.ENV === 'localhost') {
        return {
            dekoratørUrl: 'https://www.nav.no/dekoratoren/?simple=true',
            port: 3000,
        };
    } else if (process.env.ENV === 'dev') {
        return {
            dekoratørUrl: 'https://dekoratoren.dev.nav.no/?simple=true',
            port: 9000,
        };
    }
    return {
        dekoratørUrl: 'https://www.nav.no/dekoratoren/?simple=true',
        port: 9000,
    };
}
