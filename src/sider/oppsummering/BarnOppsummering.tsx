import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IMineBarn } from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IBarnOppsummeringProps {
    barn: IMineBarn;
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
