import * as React from 'react';
import { Link } from 'react-router-dom';

const MineBarnSide = () => {
    return (
        <div>
            <h1>Mine barn</h1>
            <p>Barn 1</p>
            <p>Barn 2</p>

            <Link to="/">Tilbake til hovedsiden</Link>
            <Link to="/omsorgssituasjon">Neste</Link>
        </div>
    );
};

export default MineBarnSide;
