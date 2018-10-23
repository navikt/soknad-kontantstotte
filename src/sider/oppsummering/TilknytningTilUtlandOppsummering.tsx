import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    IFamilieforhold,
    ITilknytningTilUtland,
    Svar,
    TilknytningTilUtlandVerdier,
} from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface ITilknytningTilUtlandOppsummeringProps {
    familieforhold: IFamilieforhold;
    tilknytningTilUtland: ITilknytningTilUtland;
}

const hentTekstNokkelForTilknytningTilUtlandSvar: (
    svar: TilknytningTilUtlandVerdier,
    erAnnenForelder: boolean
) => string = (svar, erAnnenForelder) => {
    switch (svar) {
        case TilknytningTilUtlandVerdier.jaINorge:
            return 'oppsummering.tilknytningTilUtland.svar.jaINorge';
        case TilknytningTilUtlandVerdier.jaIEOS:
            return 'oppsummering.tilknytningTilUtland.svar.jaIEOS';
        case TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS:
            return erAnnenForelder
                ? 'oppsummering.tilknytningTilUtland.svar.annenForelder.jaLeggerSammenPerioderEOS'
                : 'oppsummering.tilknytningTilUtland.svar.soker.jaLeggerSammenPerioderEOS';
        case TilknytningTilUtlandVerdier.nei:
            return erAnnenForelder
                ? 'oppsummering.tilknytningTilUtland.svar.annenForelder.nei'
                : 'oppsummering.tilknytningTilUtland.svar.soker.nei';
    }
    return 'Ubesvart';
};

const skalViseForklaringsFelt: (svar: TilknytningTilUtlandVerdier) => boolean = svar => {
    return (
        svar === TilknytningTilUtlandVerdier.jaIEOS ||
        svar === TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS
    );
};

const TilknytningTilUtlandOppsummering: React.StatelessComponent<
    ITilknytningTilUtlandOppsummeringProps
> = ({ familieforhold, tilknytningTilUtland }) => {
    const boddEllerJobbetINorgeMinstFemAarSvar = hentTekstNokkelForTilknytningTilUtlandSvar(
        tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.verdi as TilknytningTilUtlandVerdier,
        false
    );
    const annenForelderBoddEllerJobbetINorgeMinstFemAarSvar = hentTekstNokkelForTilknytningTilUtlandSvar(
        tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar
            .verdi as TilknytningTilUtlandVerdier,
        true
    );

    return (
        <OppsummeringSteg>
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
            {skalViseForklaringsFelt(tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar
                .verdi as TilknytningTilUtlandVerdier) && (
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
                skalViseForklaringsFelt(tilknytningTilUtland
                    .annenForelderBoddEllerJobbetINorgeMinstFemAar
                    .verdi as TilknytningTilUtlandVerdier) && (
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
        </OppsummeringSteg>
    );
};

export default TilknytningTilUtlandOppsummering;
