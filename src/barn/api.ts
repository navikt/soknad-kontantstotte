import axios from 'axios';

function fetchBarn() {
    return axios.get('/barn')
        .then((response) => {
            return response.data;
        });
}

export {
    fetchBarn
};
