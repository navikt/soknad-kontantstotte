import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const MineBarnSide = (): JSX.Element => {
    return (
        <SideContainer>
            <h1>Mine barn</h1>
            <p>Barn 1</p>
            <p>Barn 2</p>

            <NavigasjonKnapp to='/omsorgssituasjon'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

export default MineBarnSide;
