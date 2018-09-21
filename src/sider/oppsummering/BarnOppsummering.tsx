import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IMineBarn } from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnOppsummeringProps {
    barn: IMineBarn;
}

const BarnOppsummering: React.StatelessComponent<IBarnOppsummeringProps> = ({ barn }) => {
    return (
        <OppsummeringPanel>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'barn.tittel'} />}
                svar={`${barn.navn.verdi} - ${barn.fodselsdato.verdi}`}
            />
        </OppsummeringPanel>
    );
};

export { BarnOppsummering };
