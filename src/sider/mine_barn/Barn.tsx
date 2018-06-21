import * as React from 'react';
import { IBarn } from '../../barn/types';

interface IBarnProps {
    barn: IBarn;
    valgt: boolean,
    onClick: (barn: IBarn) => any;
}

const Barn: React.StatelessComponent<IBarnProps> = ({
    barn,
    valgt,
    onClick
}) => {
    const className = `mine-barn__barn ${valgt ? 'mine-barn__barn--valgt' : '' }`;
    return (
        <button
            key={barn.navn}
            className={ className }
            onClick={() => onClick(barn)}
        >
            <p>Navn: {barn.navn}</p>
            <p>Fødselsdato: {barn.fodselsDato}</p>
        </button>
    );
};

export default Barn;