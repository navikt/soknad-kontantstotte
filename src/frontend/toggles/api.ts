import axios from 'axios';
import { IToggleName } from './types';

function fetchToggles() {
    const toggleNames = Object.values(IToggleName).join('&feature=');

    // return axios.get(`/api/feature?feature=${toggleNames}`).then(response => {
    //     return response.data;
    // });
    // TODO: pus-decorator fikset unleash integrasjon før. Må sette opp unleash integrasjon på nytt.
    // Kun vedlikeholdsmodus er brukt i koden.
    throw new Error('Unleash is not set up');
}

export { fetchToggles };
