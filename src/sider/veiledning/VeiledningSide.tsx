import * as React from 'react';
import { Link } from 'react-router-dom';

const VeiledningSide = () => {
    return (
        <div>
            <h1>Veiledningsside</h1>
            <p>Info om søknad om kontantstøtte </p>
            <Link to="/start">Gå til søknad</Link>
        </div>
    );
};

export default VeiledningSide;
