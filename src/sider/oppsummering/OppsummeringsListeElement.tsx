import * as React from 'react';
import Suksessikon from '../../component/Ikoner/Suksessikon';

interface IOppsummeringsListeElementProps {
    tekst: string;
}

const OppsummeringsListeElement: React.StatelessComponent<IOppsummeringsListeElementProps> = ({
    children,
    tekst,
}) => {
    return (
        <li className="list-unstyled">
            <span>
                <Suksessikon /> {tekst}
            </span>
            {children && <li> {children}</li>}
        </li>
    );
};

export default OppsummeringsListeElement;
