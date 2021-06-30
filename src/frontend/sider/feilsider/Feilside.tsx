import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface IFeilside {
    ikon: React.ReactNode;
    tekster: {
        feilmelding: string;
        tittel: string;
    };
    knapp?: React.ReactNode;
}

const Feilside: React.StatelessComponent<IFeilside> = ({ ikon, tekster, knapp }) => {
    return (
        <div className={'feilside'}>
            <Sidetittel className={'side-container__soknadtittel'}>
                <FormattedMessage
                    id={'kontantstotte.tittel'}
                    defaultMessage={'Søknad om kontantstøtte'}
                />
            </Sidetittel>
            <div className={'feilside__ikon'}>{ikon}</div>

            <Innholdstittel tag="h2">
                <FormattedMessage id={tekster.tittel} defaultMessage={'Obs!'} />
            </Innholdstittel>

            <AlertStripeAdvarsel className={'feilside__alertstripe'}>
                <FormattedMessage
                    id={tekster.feilmelding}
                    defaultMessage={
                        'En feil har oppstått og vi klarer ikke vise deg søknaden. Prøv igjen senere'
                    }
                />
            </AlertStripeAdvarsel>

            {knapp !== undefined ? (
                knapp
            ) : (
                <a href={'/'} className={'feilside__knapp knapp knapp--standard'}>
                    <FormattedMessage
                        id={'feilside.generell.knapp'}
                        defaultMessage={'Start på nytt'}
                    />
                </a>
            )}
        </div>
    );
};

export default Feilside;
