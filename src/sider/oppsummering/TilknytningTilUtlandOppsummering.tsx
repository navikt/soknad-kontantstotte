import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, ITilknytningTilUtland, Svar } from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface ITilknytningTilUtlandOppsummeringProps {
    familieforhold: IFamilieforhold;
    tilknytningTilUtland: ITilknytningTilUtland;
}

const TilknytningTilUtlandOppsummering: React.StatelessComponent<
    ITilknytningTilUtlandOppsummeringProps
> = ({ familieforhold, tilknytningTilUtland }) => {
    return (
        <OppsummeringPanel>
            <Element>
                <FormattedMessage id={'tilknytningTilUtland.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={'oppsummering.tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar'}
                    />
                }
                svar={tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi}
            />
            {tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.verdi !== '' && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={
                                'oppsummering.tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring'
                            }
                        />
                    }
                    svar={tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.verdi}
                />
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={
                                'oppsummering.tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar'
                            }
                        />
                    }
                    svar={tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi}
                />
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring
                    .verdi !== '' && (
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={
                                    'oppsummering.tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring'
                                }
                            />
                        }
                        svar={
                            tilknytningTilUtland
                                .annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring.verdi
                        }
                    />
                )}
        </OppsummeringPanel>
    );
};

export default TilknytningTilUtlandOppsummering;
