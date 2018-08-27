import * as React from 'react';
import Navigasjonknapp from '../../component/Navigasjonknapp/Navigasjonknapp';
import SideContainer from '../../component/SideContainer/SideContainer';

const Kvittering = (): JSX.Element => {
    return (
        <SideContainer>
            <h1>Takk for søknaden! Svarer snarest</h1>
            <Navigasjonknapp to="/">Tilbake til hovedsiden</Navigasjonknapp>
        </SideContainer>
    );
};

export default Kvittering;
