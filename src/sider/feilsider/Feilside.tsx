import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IFeilside {
    ikon: React.ReactNode;
    tekster: {
        feilmelding: string;
        knapp: string;
        tittel: string;
    };
}

const Feilside: React.StatelessComponent<IFeilside> = ({ ikon, tekster }) => {
    return (
        <div className={'feilside'}>
            <Sidetittel className={'side-container__soknadtittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Sidetittel>
            <div className={'feilside__ikon'}>{ikon}</div>

            <h3 className={'typo-innholdstittel'}>
                <FormattedMessage id={tekster.tittel} />
            </h3>

            <AlertStripeAdvarselSolid className={'feilside__alertstripe'}>
                <FormattedMessage id={tekster.feilmelding} />
            </AlertStripeAdvarselSolid>

            <a href={'/'} className={'feilside__knapp knapp knapp--standard'}>
                <FormattedMessage id={tekster.knapp} />
            </a>
        </div>
    );
};

export default Feilside;
