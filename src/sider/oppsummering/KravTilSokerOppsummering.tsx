import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKravTilSoker } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IKravTilSokerProps {
    kravTilSoker: IKravTilSoker;
    intl: InjectedIntl;
}

const KravTilSokerOppsummering: React.StatelessComponent<IKravTilSokerProps> = ({
    intl,
    kravTilSoker,
}) => {
    return (
        <>
            <OppsummeringsListeElement
                tekst={intl.formatMessage({ id: 'oppsummering.kravtilsoker.norskStatsborger' })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: 'oppsummering.kravtilsoker.boddEllerJobbetINorgeSisteFemAar',
                })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({ id: 'oppsummering.kravtilsoker.borSammenMedBarnet' })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({ id: 'oppsummering.kravtilsoker.barnIkkeHjemme' })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({ id: 'oppsummering.kravtilsoker.ikkeAvtaltDeltBosted' })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: 'oppsummering.kravtilsoker.skalBoMedBarnetINorgeNesteTolvMaaneder',
                })}
            />
        </>
    );
};

export default KravTilSokerOppsummering;
