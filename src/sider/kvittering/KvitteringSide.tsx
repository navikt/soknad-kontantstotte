import * as React from 'react';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';

const KvitteringSide = () => {
    return (
        <div>
            <h1>Takk for søknaden! Svarer snarest</h1>
            <NavigasjonKnapp to="/">Tilbake til hovedsiden</NavigasjonKnapp>
        </div>
    );
};

export default KvitteringSide;
