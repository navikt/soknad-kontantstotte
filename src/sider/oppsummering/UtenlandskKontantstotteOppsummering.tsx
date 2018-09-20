import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IUtenlandskKontantstotte } from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface IUtenlandskKontantstotteOppsummeringProps {
    utenlandskKontantstotte: IUtenlandskKontantstotte;
}

type UtenlandskKontantstotteOppsummeringProps = IUtenlandskKontantstotteOppsummeringProps;

const UtenlandskKontantstotteOppsummering: React.StatelessComponent<
    UtenlandskKontantstotteOppsummeringProps
> = ({ utenlandskKontantstotte }) => {
    const {
        mottarKontantstotteFraUtlandet,
        mottarKontantstotteFraUtlandetTilleggsinfo,
    } = utenlandskKontantstotte;
    return (
        <OppsummeringPanel>
            <Element>
                <FormattedMessage id={'utenlandskKontantstotte.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.sporsmal'}
                    />
                }
                svar={mottarKontantstotteFraUtlandet.verdi}
            />
            {mottarKontantstotteFraUtlandet.verdi === 'JA' && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={
                                'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.tilleggsinfo.sporsmal'
                            }
                        />
                    }
                    svar={mottarKontantstotteFraUtlandetTilleggsinfo.verdi}
                />
            )}
        </OppsummeringPanel>
    );
};

export default UtenlandskKontantstotteOppsummering;
