import * as React from 'react';
import { Link } from 'react-router-dom';

const OppsummeringSide = () => {
    return (
        <div>
            <h1>Oversikt over hva du har fylt ut</h1>


            <Link to="/kvittering">Send inn</Link>
        </div>
    );
};

export default OppsummeringSide;
