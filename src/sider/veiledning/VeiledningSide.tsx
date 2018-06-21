import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const VeiledningSide = () => {
    return (
        <div>
            <h1>Veiledningsside</h1>
            <p>Info om søknad om kontantstøtte </p>
            <NavigasjonKnapp to='/start'>Start søknad</NavigasjonKnapp>
        </div>
    );
};

export default VeiledningSide;
