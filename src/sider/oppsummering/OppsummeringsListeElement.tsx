import * as React from 'react';
import SoknadIkon, { SoknadIkonTyper } from '../../component/SoknadIkon/SoknadIkon';

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
                <SoknadIkon ikon={SoknadIkonTyper.godkjent} /> {tekst}
            </span>
            {children && <li> {children}</li>}
        </li>
    );
};

export default OppsummeringsListeElement;
