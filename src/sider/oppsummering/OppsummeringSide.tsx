import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const OppsummeringSide = () => {
    return (
        <div>
            <h1>Oversikt over hva du har fylt ut</h1>
            <NavigasjonKnapp to='/kvittering'>Send Inn</NavigasjonKnapp>
        </div>
    );
};

export default OppsummeringSide;
