import * as React from 'react';

interface IOppsummeringSporsmalSvarProps {
    sporsmal: string;
    svar: string;
}

const OppsummeringSporsmalSvar: React.StatelessComponent<IOppsummeringSporsmalSvarProps> = ({
    sporsmal,
    svar,
}) => {
    return (
        <div className={'oppsummering__element'}>
            <h4 className={'oppsummering__element--sporsmal'}>{sporsmal}</h4>
            <span className={'oppsummering__element--svar'}>{svar.toLowerCase()}</span>
        </div>
    );
};

export default OppsummeringSporsmalSvar;
