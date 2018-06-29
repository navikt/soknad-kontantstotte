import Input from 'nav-frontend-skjema/lib/input';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import DatoFelt from './DatoFelt';

interface IEkstraFelterProps {
    settFelt: (nokkel: string, verdi: string) => any;
}

type JaSkalSlutteEkstraFelter = IEkstraFelterProps & InjectedIntlProps;

const JaSkalSlutteEkstraFelter: React.StatelessComponent<JaSkalSlutteEkstraFelter> = ({settFelt, intl}) => {
    return (
        <div>
            <DatoFelt
                nokkel={intl.formatMessage({id: 'barnehageplass.skalSlutteDato'})}
                settDato={(dato) => settFelt('jaSkalSlutteDato', dato.toDateString())}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaSkalSlutteKommune', event.target.value)}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.antallTimer'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaSkalSlutteAntallTimer', event.target.value)}
            />
        </div>
    );
};

export default injectIntl(JaSkalSlutteEkstraFelter);
