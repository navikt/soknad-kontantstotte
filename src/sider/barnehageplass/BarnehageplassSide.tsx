import * as React from 'react';
import { Link } from 'react-router-dom';
import NavigasjonKnapp from "../../component/NavigasjonKnapp/NavigasjonKnapp";

const BarnehageplassSide = () => {
    return (
        <div>
            <h1>Har barnet barnehageplass?</h1>
            <NavigasjonKnapp to="/utenlandsk-forbindelse">Neste</NavigasjonKnapp>
        </div>
    );
};

export default BarnehageplassSide;
