import * as classNames from 'classnames';
import * as React from 'react';
import { IBarn } from '../../barn/types';

interface IBarnProps {
    barn: IBarn;
    valgt: boolean;
    onClick: (barn: IBarn) => void;
}

const Barn: React.StatelessComponent<IBarnProps> = ({
    barn,
    valgt,
    onClick
}) => {
    const className = classNames(
        'mine-barn__barn',
        { 'mine-barn__barn--valgt': valgt }
    );
    return (
        <button
            key={barn.navn}
            className={ className }
            onClick={() => onClick(barn)}
        >
            <p>Navn: {barn.navn}</p>
            <p>Fødselsdato: {barn.fodselsdato}</p>
        </button>
    );
};

export default Barn;
