import Datovelger from 'nav-datovelger';
import * as React from 'react';
import SkjemaInputElement from '../../common/lib/validation/SkjemaInputElement';
import { IFeil } from '../../common/lib/validation/types';

interface IOwnProps {
    name: string;
    label: string;
    settDato: (verdi: Date) => void;
    dato?: Date;
    feil?: IFeil;
}

type DatoFeltProps = IOwnProps;

const DatoFelt: React.StatelessComponent<DatoFeltProps> = ({
    name,
    label,
    dato,
    feil,
    settDato,
    ...rest
}) => {
    return (
        <SkjemaInputElement feil={feil} label={label}>
            <Datovelger
                {...rest}
                id={name}
                dato={dato}
                onChange={settDato}
                inputProps={{ placeholder: 'dd.mm.åååå' }}
            />
        </SkjemaInputElement>
    );
};

export default DatoFelt;
export { DatoFeltProps };
