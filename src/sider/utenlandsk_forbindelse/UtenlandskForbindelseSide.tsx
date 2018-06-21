import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const UtenlandskForbindelseSide = (): JSX.Element => {
    return (
        <SideContainer>
            <h1>Mottar du ytelser fra utlandet?</h1>
            <NavigasjonKnapp to='/oppsummering'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

export default UtenlandskForbindelseSide;
