import Datovelger from 'nav-datovelger';
import * as React from 'react';

interface IOwnProps {
    nokkel: string;
    settDato: (verdi: Date) => any;
}

type DatoFeltProps = IOwnProps;

const DatoFelt: React.StatelessComponent<DatoFeltProps> = ({nokkel, settDato}) => {

    return (
        <div>
            <label>{nokkel}</label>
            <Datovelger id={nokkel} onChange={settDato}/>
        </div>

    );
};

export default DatoFelt;
