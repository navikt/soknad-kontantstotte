import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IBarnehageplass, Svar } from '../../soknad/types';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    intl: InjectedIntl;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    intl,
}) => {
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
                svar={barnehageplass.barnBarnehageplassStatus.verdi}
            />
        </div>
    );
};

export default BarnehageplassOppsummering;
