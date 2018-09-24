import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    IFamilieforhold,
    ITilknytningTilUtland,
    Svar,
    TilknytningTilUtlandVerdier,
} from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface ITilknytningTilUtlandOppsummeringProps {
    familieforhold: IFamilieforhold;
    tilknytningTilUtland: ITilknytningTilUtland;
}

const hentTekstNokkelForTilknytningTilUtlandSvar: (
    svar: TilknytningTilUtlandVerdier
) => string = svar => {
    let tekstNokkelForSvar: string = 'Ubesvart';
    switch (svar) {
        case TilknytningTilUtlandVerdier.jaINorge:
            tekstNokkelForSvar = 'oppsummering.tilknytningTilUtland.svar.jaINorge';
            break;
        case TilknytningTilUtlandVerdier.jaIEOS:
            tekstNokkelForSvar = 'oppsummering.tilknytningTilUtland.svar.jaIEOS';
            break;
        case TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS:
            tekstNokkelForSvar = 'oppsummering.tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS';
            break;
        case TilknytningTilUtlandVerdier.nei:
            tekstNokkelForSvar = 'oppsummering.tilknytningTilUtland.svar.nei';
            break;
    }
    return tekstNokkelForSvar;
};

const TilknytningTilUtlandOppsummering: React.StatelessComponent<
    ITilknytningTilUtlandOppsummeringProps
> = ({ familieforhold, tilknytningTilUtland }) => {
    const boddEllerJobbetINorgeMinstFemAarSvar = hentTekstNokkelForTilknytningTilUtlandSvar(
        tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi as TilknytningTilUtlandVerdier
    );
    const annenForelderBoddEllerJobbetINorgeMinstFemAarSvar = hentTekstNokkelForTilknytningTilUtlandSvar(
        tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar
            .verdi as TilknytningTilUtlandVerdier
    );

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
                svar={<FormattedMessage id={boddEllerJobbetINorgeMinstFemAarSvar} />}
            />
            {tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.verdi !== '' && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage id={'oppsummering.tilknytningTilUtland.forklaring'} />
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
                    svar={
                        <FormattedMessage id={annenForelderBoddEllerJobbetINorgeMinstFemAarSvar} />
                    }
                />
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring
                    .verdi !== '' && (
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage id={'oppsummering.tilknytningTilUtland.forklaring'} />
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
