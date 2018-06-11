import * as React from 'react';
import { Link } from 'react-router-dom';

const VeilendingSide = () => {
    return (
        <div>
            <h1>Veiledningsside</h1>
            <p>Info om søknad om kontantstøtte </p>
            <Link to="/mine-barn">Gå til mine barn</Link>
        </div>
    );
};

export default VeilendingSide;
