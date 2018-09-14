import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { BarnehageplassVerdier, IBarnehageplass } from '../../soknad/types';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    intl: InjectedIntl;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    intl,
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
        <div>
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({
                    id: 'oppsummering.barnehageplass.harBarnehageplass',
                })}
                svar={barnehageplass.harBarnehageplass.verdi}
            />
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({ id: 'barnehageplass.barnBarnehageplassStatus' })}
                svar={intl.formatMessage({
                    id: barnBarnehageplassStatusSvar,
                })}
            />
            {barnehageplass.barnBarnehageplassStatus.verdi ===
                BarnehageplassVerdier.harBarnehageplass && (
                <>
                    <OppsummeringSporsmalSvar
                        sporsmal={intl.formatMessage({
                            id: 'barnehageplass.harBarnehageplass.antallTimer.sporsmal',
                        })}
                        svar={barnehageplass.harBarnehageplassAntallTimer.verdi}
                    />
                    <OppsummeringSporsmalSvar
                        sporsmal={intl.formatMessage({
                            id: 'barnehageplass.harBarnehageplass.dato.sporsmal',
                        })}
                        svar={barnehageplass.harBarnehageplassDato.verdi}
                    />
                    <OppsummeringSporsmalSvar
                        sporsmal={intl.formatMessage({
                            id: 'barnehageplass.harBarnehageplass.kommune.sporsmal',
                        })}
                        svar={barnehageplass.harBarnehageplassKommune.verdi}
                    />
                </>
            )}
        </div>
    );
};

export default BarnehageplassOppsummering;
