import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';

const FamilieforholdSide = () => {
    return (
        <SideContainer>
            <h1>Bor begge foreldrene med barnet?</h1>
            <NavigasjonKnapp to='/barnehageplass'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

export default FamilieforholdSide;
