import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IFamilieforhold, IUtenlandskKontantstotte, Svar } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IUtenlandskKontantstotteOppsummeringProps {
    intl: InjectedIntl;
    utenlandskKontantstotte: IUtenlandskKontantstotte;
}

type UtenlandskKontantstotteOppsummeringProps = IUtenlandskKontantstotteOppsummeringProps;

const UtenlandskKontantstotteOppsummering: React.StatelessComponent<
    UtenlandskKontantstotteOppsummeringProps
> = ({ intl, utenlandskKontantstotte }) => {
    const {
        mottarKontantstotteFraUtlandet,
        mottarKontantstotteFraUtlandetTilleggsinfo,
    } = utenlandskKontantstotte;
    return (
        <>
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({
                    id: 'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.sporsmal',
                })}
                svar={mottarKontantstotteFraUtlandet.verdi}
            />
            {mottarKontantstotteFraUtlandet.verdi === 'JA' && (
                <ul>
                    <li className="list-unstyled list-detaljer">
                        <Normaltekst>
                            <FormattedMessage id="utenlandskKontantstotte.mottarKontantstotteFraUtlandet.tilleggsinfo.sporsmal" />
                        </Normaltekst>
                        <Element>{mottarKontantstotteFraUtlandetTilleggsinfo.verdi}</Element>
                    </li>
                </ul>
            )}
        </>
    );
};

export default UtenlandskKontantstotteOppsummering;
