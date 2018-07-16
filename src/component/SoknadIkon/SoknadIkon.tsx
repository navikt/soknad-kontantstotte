import * as React from 'react';
import SuksessIkon from './ikoner/SuksessIkon';

export enum SoknadIkonTyper {
    'godkjent' = 'godkjent',
}

export interface ISoknadIkonProps {
    ikon: SoknadIkonTyper;
}

const SoknadIkon: React.StatelessComponent<ISoknadIkonProps> = ({ ikon }) => {
    switch (ikon) {
        case 'godkjent':
            return <SuksessIkon />;
        default:
            return <SuksessIkon />;
    }
};
