import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFamilieforhold, IUtenlandskKontantstotte, Svar } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IUtenlandskKontantstotteOppsummeringProps {
    intl: InjectedIntl;
    utenlandskKontantstotte: IUtenlandskKontantstotte;
}

type UtenlandskKontantstotteOppsummeringProps = IUtenlandskKontantstotteOppsummeringProps;

const UtenlandskKontantstotteOppsummering: React.StatelessComponent<
    UtenlandskKontantstotteOppsummeringProps
> = ({ intl, utenlandskKontantstotte }) => {
    return (
        <>
            {utenlandskKontantstotte.mottarKontantstotteFraUtlandet.verdi === Svar.NEI && (
                <>
                    <OppsummeringsListeElement
                        tekst={intl.formatMessage({
                            id: 'oppsummering.utenlandskKontantstotte.mottarIkkeKontantstotte',
                        })}
                    />
                </>
            )}

            {utenlandskKontantstotte.mottarKontantstotteFraUtlandet.verdi === Svar.JA && (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({
                        id: 'oppsummering.utenlandskKontantstotte.mottarKontantstotte',
                    })}
                />
            )}
        </>
    );
};

export default UtenlandskKontantstotteOppsummering;
