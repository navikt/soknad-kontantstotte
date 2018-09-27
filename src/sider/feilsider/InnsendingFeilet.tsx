import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { InnsendingFeiletIkon } from '../../component/Ikoner/InnsendingFeiletIkon';

const InnsendingFeilet = () => {
    return (
        <div className={'innsending-feilet'}>
            <Sidetittel className={'side-container__soknadtittel'}>
                <FormattedMessage id={'kontantstotte.tittel'} />
            </Sidetittel>
            <div className={'innsending-feilet__ikon'}>
                <InnsendingFeiletIkon />
            </div>

            <h3 className={'typo-innholdstittel'}>
                <FormattedMessage id={'feilside.innsending.tittel'} />
            </h3>

            <AlertStripeAdvarselSolid className={'innsending-feilet__alertstripe'}>
                <FormattedMessage id={'feilside.innsending.feilmelding'} />
            </AlertStripeAdvarselSolid>

            <a href={'/'} className={'innsending-feilet__knapp knapp knapp--standard'}>
                <FormattedMessage id={'feilside.innsending.knapp'} />
            </a>
        </div>
    );
};

export default InnsendingFeilet;
