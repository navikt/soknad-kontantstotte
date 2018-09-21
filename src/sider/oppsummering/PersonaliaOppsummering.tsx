import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OppsummeringSteg } from './OppsummeringSteg';

interface IMapStateToProps {
    person: {
        navn: string;
        fodselsnummer: string;
    };
}

type PersonaliaOgBarnProps = IMapStateToProps;

const PersonaliaOppsummering: React.StatelessComponent<PersonaliaOgBarnProps> = ({ person }) => {
    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id="oppsummering.sokerKontantstotteAv.label" />
            </Element>
            <Normaltekst>{person.navn}</Normaltekst>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsnummer.label" />
                {person.fodselsnummer}
            </Normaltekst>
        </OppsummeringSteg>
    );
};

export default PersonaliaOppsummering;
