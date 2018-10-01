import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IUtenlandskKontantstotte, Svar } from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
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
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'utenlandskKontantstotte.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={'utenlandskKontantstotte.mottarKontantstotteFraUtlandet.sporsmal'}
                    />
                }
                svar={
                    <FormattedMessage
                        id={
                            mottarKontantstotteFraUtlandet.verdi === Svar.JA
                                ? 'svar.ja'
                                : 'svar.nei'
                        }
                    />
                }
            />
            {mottarKontantstotteFraUtlandet.verdi === Svar.JA && (
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
        </OppsummeringSteg>
    );
};

export default UtenlandskKontantstotteOppsummering;
