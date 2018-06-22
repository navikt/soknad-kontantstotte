import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const SidenFinnesIkkeSide = () => {
    return (
        <div>
            <h1>Ooops</h1>
            <p>Siden du prøver å nå finnes ikke</p>

            <NavigasjonKnapp to='/'>Tilbake til hovedsiden</NavigasjonKnapp>
        </div>
    );
};

export default SidenFinnesIkkeSide;
