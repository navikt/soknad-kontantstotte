import * as React from 'react';
import { IBarn } from '../../person/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { FormattedMessage } from 'react-intl';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnOppsummeringProps {
    barn: IBarn;
}

const BarnOppsummering: React.StatelessComponent<IBarnOppsummeringProps> = ({ barn }) => {
    return (
        <OppsummeringPanel>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'oppsummering.barne.tittel'} />}
                svar={`${barn.navn.verdi} - ${barn.fodselsdato.verdi}`}
            />
        </OppsummeringPanel>
    );
};

export { BarnOppsummering };
