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
            barnBarnehageplassStatusSvar = intl.formatMessage({
                id: 'barnehageplass.garIkkeIBarnehage',
            });
            break;
        case BarnehageplassVerdier.harBarnehageplass:
            barnBarnehageplassStatusSvar = intl.formatMessage({
                id: 'barnehageplass.harBarnehageplass',
            });
            break;
        case BarnehageplassVerdier.harSluttetIBarnehage:
            barnBarnehageplassStatusSvar = intl.formatMessage({
                id: 'barnehageplass.harSluttetIBarnehage',
            });
            break;
        case BarnehageplassVerdier.skalBegynneIBarnehage:
            barnBarnehageplassStatusSvar = intl.formatMessage({
                id: 'barnehageplass.skalBegynneIBarnehage',
            });
            break;
        case BarnehageplassVerdier.skalSlutteIBarnehage:
            barnBarnehageplassStatusSvar = intl.formatMessage({
                id: 'barnehageplass.skalSlutteIBarnehage',
            });
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
                svar={barnBarnehageplassStatusSvar}
            />
        </div>
    );
};

export default BarnehageplassOppsummering;
