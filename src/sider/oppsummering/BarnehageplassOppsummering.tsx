import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { BarnehageplassVerdier, IBarnehageplass } from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
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
        <OppsummeringPanel>
            <Element>
                <FormattedMessage id={'oppsummering.barnehageplass.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'oppsummering.barnehageplass.harBarnehageplass'} />}
                svar={barnehageplass.harBarnehageplass.verdi}
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
                                id={'barnehageplass.harSluttetIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageKommune.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.harSluttetIBarnehageAntallTimer.verdi}
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
                                id={'barnehageplass.skalSlutteIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageKommune.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalSlutteIBarnehageAntallTimer.verdi}
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
                                id={'barnehageplass.skalBegynneIBarnehage.kommune.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageKommune.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'barnehageplass.skalBegynneIBarnehage.antallTimer.sporsmal'}
                            />
                        }
                        svar={barnehageplass.skalBegynneIBarnehageAntallTimer.verdi}
                    />
                </>
            )}
        </OppsummeringPanel>
    );
};

export default BarnehageplassOppsummering;
