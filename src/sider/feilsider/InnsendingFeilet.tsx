import * as React from 'react';
import { InnsendingFeiletIkon } from '../../component/Ikoner/InnsendingFeiletIkon';
import Feilside from './Feilside';

const InnsendingFeilet = () => {
    return (
        <Feilside
            ikon={<InnsendingFeiletIkon />}
            tekster={{
                feilmelding: 'feilside.innsending.feilmelding',
                knapp: 'feilside.innsending.knapp',
                tittel: 'feilside.innsending.tittel',
            }}
        />
    );
};

export default InnsendingFeilet;
