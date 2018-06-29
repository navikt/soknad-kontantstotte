import Input from 'nav-frontend-skjema/lib/input';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import DatoFelt from './DatoFelt';

interface IEkstraFelterProps {
    settFelt: (nokkel: string, verdi: string) => any;
}

type JaEkstraFelterProps = IEkstraFelterProps & InjectedIntlProps;

const EkstraFelterForJa: React.StatelessComponent<JaEkstraFelterProps> = ({settFelt, intl}) => {
    return (
        <div>
            <DatoFelt
                nokkel={intl.formatMessage({id: 'barnehageplass.harFaattPlassDato'})}
                settDato={(dato) => settFelt('jaFraDato', dato.toDateString())}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaKommune', event.target.value)}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.antallTimer'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaAntallTimer', event.target.value)}
            />
        </div>
    );
};

export default injectIntl(EkstraFelterForJa);
