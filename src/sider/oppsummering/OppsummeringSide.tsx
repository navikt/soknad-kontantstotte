import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const OppsummeringSide = () => {
    return (
        <SideContainer>
            <h1>Oversikt over hva du har fylt ut</h1>
            <NavigasjonKnapp to='/kvittering'>Send Inn</NavigasjonKnapp>
        </SideContainer>
    );
};

export default OppsummeringSide;
