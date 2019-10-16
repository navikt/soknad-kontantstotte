import axios from 'axios';
import * as moment from 'moment-timezone';
import Environment from '../Environment';
import { IKontraktSøknad } from './types';

const sendInnSamletSøknad = (soknad: object, kontraktSøknad: IKontraktSøknad) => {
    return axios
        .post(
            `${Environment().apiUrl}/sendinn`,
            {
                kontraktSøknad,
                soknad,
            },
            {
                withCredentials: true,
            }
        )
        .then(response => {
            return response.data;
        });
};

export { sendInnSamletSøknad };
