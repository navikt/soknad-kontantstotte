import * as React from 'react';
import { Link } from 'react-router-dom';

const SidenFinnesIkkeSide = () => {
    return (
        <div>
            <h1>Ooops</h1>
            <p>Siden du prøver å nå finnes ikke</p>
            <Link to="/">Tilbake til hovedsiden</Link>
        </div>
    );
};

export default SidenFinnesIkkeSide;
