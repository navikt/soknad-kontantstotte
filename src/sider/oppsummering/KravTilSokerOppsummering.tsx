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
                tekst={intl.formatMessage({
                    id: 'oppsummering.kravtilsoker.harBoddINorgeSisteFemAar',
                })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({ id: 'oppsummering.kravtilsoker.borMedBarnet' })}
            />
            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: 'oppsummering.kravtilsoker.skalBoINorgeNesteAaret',
                })}
            />
        </>
    );
};

export default KravTilSokerOppsummering;
