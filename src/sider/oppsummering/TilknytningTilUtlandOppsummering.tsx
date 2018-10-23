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
            return 'tilknytningTilUtland.svar.jaINorge';
        case TilknytningTilUtlandVerdier.jaIEOS:
            return 'tilknytningTilUtland.svar.jaIEOS';
        case TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS:
            return erAnnenForelder
                ? 'tilknytningTilUtland.svar.annenForelder.jaLeggerSammenPerioderEOS'
                : 'tilknytningTilUtland.svar.soker.jaLeggerSammenPerioderEOS';
        case TilknytningTilUtlandVerdier.nei:
            return erAnnenForelder
                ? 'tilknytningTilUtland.svar.annenForelder.nei'
                : 'tilknytningTilUtland.svar.soker.nei';
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
                        id={'tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.sporsmal'}
                    />
                }
                svar={<FormattedMessage id={boddEllerJobbetINorgeMinstFemAarSvar} />}
            />
            {skalViseForklaringsFelt(tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar
                .verdi as TilknytningTilUtlandVerdier) && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage id={'tilknytningTilUtland.forklaring.hjelpetekst'} />
                    }
                    svar={tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAarForklaring.verdi}
                />
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={
                                'tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.sporsmal'
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
                            <FormattedMessage id={'tilknytningTilUtland.forklaring.hjelpetekst'} />
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
