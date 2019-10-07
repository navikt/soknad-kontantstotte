import axios from 'axios';
import * as moment from 'moment-timezone';
import Environment from '../Environment';
import { IKontraktSøknad } from './types';

const sendInnSoknad = (soknad: object): Promise<moment.Moment> => {
    return axios
        .post(`${Environment().apiUrl}/sendinn`, soknad, {
            withCredentials: true,
        })
        .then(response => {
            return moment(response.data.innsendtDato);
        });
};

const sendInnKontraktSøknad = (søknad: IKontraktSøknad) => {
    return axios
        .post(`${Environment().apiUrl}/sendinn/medkontrakt`, søknad, {
            withCredentials: true,
        })
        .then(response => {
            return response.data;
        });
};

export { sendInnSoknad, sendInnKontraktSøknad };
