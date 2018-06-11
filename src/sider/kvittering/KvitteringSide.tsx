import * as React from 'react';
import { Link } from 'react-router-dom';

const KvitteringSide = () => {
    return (
        <div>
            <h1>Takk for søknaden! Svarer snarest</h1>

            <Link to="/">Tilbake til hovedsiden</Link>
        </div>
    );
};

export default KvitteringSide;
