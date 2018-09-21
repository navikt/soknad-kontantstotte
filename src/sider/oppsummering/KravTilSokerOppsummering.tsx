import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OppsummeringSteg } from './OppsummeringSteg';

const KravTilSokerOppsummering: React.StatelessComponent<{}> = () => {
    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'oppsummering.kravtilsoker.tittel'} />
            </Element>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'oppsummering.kravtilsoker.norskStatsborger'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage
                    id={'oppsummering.kravtilsoker.boddEllerJobbetINorgeSisteFemAar'}
                />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'oppsummering.kravtilsoker.borSammenMedBarnet'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'oppsummering.kravtilsoker.barnIkkeHjemme'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage id={'oppsummering.kravtilsoker.ikkeAvtaltDeltBosted'} />
            </Normaltekst>

            <Normaltekst className={'oppsummering__svar'}>
                <FormattedMessage
                    id={'oppsummering.kravtilsoker.skalBoMedBarnetINorgeNesteTolvMaaneder'}
                />
            </Normaltekst>
        </OppsummeringSteg>
    );
};

export default KravTilSokerOppsummering;
