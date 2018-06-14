import * as React from 'react';
import { Link } from 'react-router-dom';

const OmsorgssituasjonSide = () => {
    return (
        <div>
            <h1>Bor begge foreldrene med barnet?</h1>


            <Link to="/barnehageplass">Neste</Link>
        </div>
    );
};

export default OmsorgssituasjonSide;
