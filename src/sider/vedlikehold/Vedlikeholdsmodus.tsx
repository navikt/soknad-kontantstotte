import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import TimeglassIkon from '../../component/Ikoner/TimeglassIkon';

const Vedlikeholdsmodus: React.FC = () => {
    return (
        <div className={'feilside'}>
            <Sidetittel className={'side-container__soknadtittel'}>
                <FormattedMessage
                    id={'kontantstotte.tittel'}
                    defaultMessage={'Søknad om kontantstøtte'}
                />
            </Sidetittel>
            <div className={'feilside__ikon'}>
                <TimeglassIkon />
            </div>

            <h3 className={'typo-innholdstittel'}>
                <Normaltekst children="Obs!" />
            </h3>

            <AlertStripeAdvarsel className={'feilside__alertstripe'}>
                <Normaltekst children={'På grunn av vedlikehold er søknaden utilgjengelig.'} />
                <br />
                <Normaltekst children={'Vi beklager ulempene dette måtte medføre.'} />
            </AlertStripeAdvarsel>
        </div>
    );
};

export default Vedlikeholdsmodus;
