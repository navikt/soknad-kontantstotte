import axios from 'axios';
import Environment from '../Environment';

const formaterDato = (dato: string) => {
    const datoObjekt = new Date(dato);
    const manedListe = [
        'januar',
        'februar',
        'mars',
        'april',
        'mai',
        'juni',
        'juli',
        'august',
        'september',
        'oktober',
        'november',
        'desember',
    ];
    const dag = datoObjekt.getDate();
    const maned = manedListe[datoObjekt.getMonth()];
    const aar = datoObjekt.getFullYear();
    const timer =
        datoObjekt.getHours() < 10 ? '0' + datoObjekt.getHours().toString() : datoObjekt.getHours();
    const minutter =
        datoObjekt.getMinutes() < 10
            ? '0' + datoObjekt.getMinutes().toString()
            : datoObjekt.getMinutes();

    return `${dag}. ${maned} ${aar} kl. ${timer}:${minutter}`;
};

function sendInnSoknad(soknad: object) {
    const formData = new FormData();
    formData.append(
        'soknad',
        new Blob([JSON.stringify(soknad)], {
            type: 'application/json',
        })
    );
    return axios
        .post(`${Environment().apiUrl}/sendinn`, formData, {
            withCredentials: true,
        })
        .then(response => {
            return formaterDato(response.data);
        });
}

export { sendInnSoknad };
