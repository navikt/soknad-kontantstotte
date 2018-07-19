import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IBarn } from '../../barn/types';

interface IMapStateToProps {
    barnet: IBarn;
    person: any;
}

type PersonaliaOgBarnProps = IMapStateToProps;

const PersonaliaOgBarnOppsummering: React.StatelessComponent<PersonaliaOgBarnProps> = ({
    person,
    barnet,
}) => {
    return (
        <div className="list-detaljer">
            <Element>
                <FormattedMessage id="oppsummering.sokerKontantstotteFor.label" />
            </Element>
            <br />
            <Element>{barnet.navn}</Element>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsnummer.label" />
                {barnet.fodselsdato}
            </Normaltekst>
            <br />
            <Normaltekst>
                <FormattedMessage id="oppsummering.avforelder.label" />
            </Normaltekst>
            <Element>{person.navn}</Element>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsnummer.label" />
                {person.fodselsnummer}
            </Normaltekst>
        </div>
    );
};

export default PersonaliaOgBarnOppsummering;
