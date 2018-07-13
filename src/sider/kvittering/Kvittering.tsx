import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../component/SideContainer/SideContainer';

const Kvittering = (): JSX.Element => {
    return (
        <SideContainer>
            <h1>Takk for søknaden! Svarer snarest</h1>
            <NavigasjonKnapp to="/">Tilbake til hovedsiden</NavigasjonKnapp>
        </SideContainer>
    );
};

export default Kvittering;
