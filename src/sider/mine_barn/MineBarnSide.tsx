import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const MineBarnSide = () => {
    return (
        <div>
            <h1>Mine barn</h1>
            <p>Barn 1</p>
            <p>Barn 2</p>

            <NavigasjonKnapp to='/omsorgssituasjon'>Neste</NavigasjonKnapp>
        </div>
    );
};

export default MineBarnSide;
