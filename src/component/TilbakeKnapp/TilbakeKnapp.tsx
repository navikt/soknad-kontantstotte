import NavFrontendChevron from 'nav-frontend-chevron';
import { Flatknapp } from 'nav-frontend-knapper';
import * as React from 'react';

const TilbakeKnapp: React.StatelessComponent<{}> = () => {
    return (
        <Flatknapp className={'tilbake-knapp'}>
            <NavFrontendChevron type="venstre" className={'tilbake-knapp__ikon'} />
            Tilbake
        </Flatknapp>
    );
};

export default TilbakeKnapp;
