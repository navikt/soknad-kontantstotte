import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const BarnehageplassSide = (): JSX.Element => {
    return (
        <SideContainer>
            <h1>Har barnet barnehageplass?</h1>
            <NavigasjonKnapp to='/utenlandsk-forbindelse'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

export default BarnehageplassSide;
