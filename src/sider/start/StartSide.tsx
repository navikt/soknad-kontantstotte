import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const StartSide = (): JSX.Element => {
    return (
        <SideContainer>
            <div>
                <h1>Oppfyller du følgende krav?</h1>
                <p> Krav 1 </p>
                <p> Krav 2 </p>
                <p> Krav 3 </p>
                <p> Krav 4 </p>
                <br/>
                <NavigasjonKnapp to='/mine-barn'>Neste</NavigasjonKnapp>
            </div>
        </SideContainer>
    );
};

export default StartSide;
