import * as React from 'react';
import { IBarn } from '../../barn/types';

interface IBarnProps {
    barn: IBarn;
    onClick: (barn: IBarn) => any;
}

const Barn: React.StatelessComponent<IBarnProps> = ({
    barn,
    onClick
}) => {
    return (
        <div key={barn.navn} className="mine-barn__barn" onClick={() => onClick(barn)}>
            <p>Navn: {barn.navn}</p>
            <p>Fødselsdato: {barn.fodselsDato}</p>
        </div>
    );
};

export default Barn;