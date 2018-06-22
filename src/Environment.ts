interface IEnvUrls {
    apiUrl: string;
    loginUrl: string;
}

const Environment = (): IEnvUrls => {
    if (process.env.NODE_ENV === 'development') {
        return {
            apiUrl: 'http://localhost:8080/soknad-kontantstotte-api',
            loginUrl: 'http://localhost:8080/soknad-kontantstotte-api/local/cookie'
        };
    }

    return {
        apiUrl: 'https://soknad-kontantstotte-api-q.nav.no/soknad-kontantstotte-api',
        loginUrl: 'https://loginservice-q.nav.no/login'
    };
};

export default Environment;
