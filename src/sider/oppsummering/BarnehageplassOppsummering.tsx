import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { BarnehageplassVerdier, IBarnehageplass, ValideringsStatus } from '../../soknad/types';
import { JaNeiSvar } from './JaNeiSvar';
import OppsummeringsAdvarsel from './OppsummeringsAdvarsel';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    visOppsummeringAdvarsel: boolean;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    visOppsummeringAdvarsel,
}) => {
    let barnBarnehageplassStatusSvar = 'Ubesvart';

    switch (barnehageplass.barnBarnehageplassStatus.verdi as BarnehageplassVerdier) {
        case BarnehageplassVerdier.garIkkeIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.garIkkeIBarnehage';
            break;
        case BarnehageplassVerdier.harBarnehageplass:
            barnBarnehageplassStatusSvar = 'barnehageplass.harBarnehageplass';
            break;
        case BarnehageplassVerdier.harSluttetIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.harSluttetIBarnehage';
            break;
        case BarnehageplassVerdier.skalBegynneIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.skalBegynneIBarnehage';
            break;
        case BarnehageplassVerdier.skalSlutteIBarnehage:
            barnBarnehageplassStatusSvar = 'barnehageplass.skalSlutteIBarnehage';
            break;
    }

    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'barnehageplass.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'oppsummering.barnehageplass.harBarnehageplass'} />}
                svar={<JaNeiSvar verdi={barnehageplass.harBarnehageplass.verdi} />}
            />

            <SporsmalSvar
                sporsmal={<FormattedMessage id={'barnehageplass.barnBarnehageplassStatus'} />}
                svar={<FormattedMessage id={barnBarnehageplassStatusSvar} />}
            />
            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.harSluttetIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harSluttetIBarnehage.dato.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harSluttetIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageKommune.verdi}
                    />
                </>
            )}

            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.skalSlutteIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.dato.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageKommune.verdi}
                    />
                </>
            )}
            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.harBarnehageplass && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harBarnehageplass.dato.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harBarnehageplassDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harBarnehageplass.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harBarnehageplassAntallTimer.verdi}
                    />
                    {barnehageplass.harBarnehageplassAntallTimer.valideringsStatus ===
                        ValideringsStatus.ADVARSEL &&
                        visOppsummeringAdvarsel && (
                            <OppsummeringsAdvarsel
                                meldingsNokkel={'advarsel.barnehageplass.timerIBarnehage'}
                            />
                        )}
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harBarnehageplass.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harBarnehageplassKommune.verdi}
                    />
                </>
            )}

            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.skalBegynneIBarnehage && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalBegynneIBarnehage.dato.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageDato.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalBegynneIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageAntallTimer.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalBegynneIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageKommune.verdi}
                    />
                </>
            )}
        </OppsummeringSteg>
    );
};

export default BarnehageplassOppsummering;
