import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const UtenlandskForbindelseSide = () => {
    return (
        <div>
            <h1>Mottar du ytelser fra utlandet?</h1>
            <NavigasjonKnapp to='/oppsummering'>Neste</NavigasjonKnapp>
        </div>
    );
};

export default UtenlandskForbindelseSide;
