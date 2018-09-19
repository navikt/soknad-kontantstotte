import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IBarn } from '../../person/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnOppsummeringProps {
    barn: IBarn;
}

const BarnOppsummering: React.StatelessComponent<IBarnOppsummeringProps> = ({ barn }) => {
    return (
        <OppsummeringSteg>
            <SporsmalSvar
                sporsmal={<FormattedMessage id={'barn.tittel'} />}
                svar={`${barn.navn.verdi} - ${barn.fodselsdato.verdi}`}
            />
        </OppsummeringSteg>
    );
};

export { BarnOppsummering };
