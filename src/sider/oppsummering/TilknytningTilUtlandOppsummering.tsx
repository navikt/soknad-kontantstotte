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
    svar: TilknytningTilUtlandVerdier
) => string = svar => {
    switch (svar) {
        case TilknytningTilUtlandVerdier.jaINorge:
            return 'oppsummering.tilknytningTilUtland.svar.jaINorge';
        case TilknytningTilUtlandVerdier.jaIEOS:
            return 'oppsummering.tilknytningTilUtland.svar.jaIEOS';
        case TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS:
            return 'oppsummering.tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS';
        case TilknytningTilUtlandVerdier.nei:
            return 'oppsummering.tilknytningTilUtland.svar.nei';
    }
    return 'Ubesvart';
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
        </OppsummeringSteg>
    );
};

export default TilknytningTilUtlandOppsummering;
