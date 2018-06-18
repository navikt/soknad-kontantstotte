import * as React from 'react';
import { Link } from 'react-router-dom';
import NavigasjonKnapp from "../../component/NavigasjonKnapp/NavigasjonKnapp";

const OmsorgssituasjonSide = () => {
    return (
        <div>
            <h1>Bor begge foreldrene med barnet?</h1>
            <NavigasjonKnapp to='/barnehageplass'>Neste</NavigasjonKnapp>
        </div>
    );
};

export default OmsorgssituasjonSide;
