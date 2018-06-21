import axios from 'axios';

function fetchTekster() {
    return axios.get('/tekster')
        .then((response) => {
            return response.data;
        });
}

export {
    fetchTekster
};
