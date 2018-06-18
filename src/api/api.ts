const REST_API_URL: string = "http://localhost:8080/soknad-kontantstotte-api/status/isAlive";

const pingBackend = () => (
    fetch(REST_API_URL).then((response) => response.json())
);

const Api = { pingBackend };
export default Api;
