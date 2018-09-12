import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IBarnehageplass, Svar } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    intl: InjectedIntl;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    intl,
}) => {
    switch (barnehageplass.harBarnehageplass.verdi) {
        case Svar.JA:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({ id: 'oppsummering.barnehageplass.harPlass' })}
                />
            );
        case Svar.NEI:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({ id: 'oppsummering.barnehageplass.harIkkePlass' })}
                />
            );
        default:
            return null;
    }
};

export default BarnehageplassOppsummering;
