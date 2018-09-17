import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IBarn } from '../../person/types';

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
            <Element>{barnet.navn.verdi}</Element>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsdato.label" />
                {barnet.fodselsdato.verdi}
            </Normaltekst>
            <br />
            <Normaltekst>
                <FormattedMessage id="oppsummering.avforelder.label" />
            </Normaltekst>
            <Element>{person.navn.verdi}</Element>
            <Normaltekst>
                <FormattedMessage id="oppsummering.fodselsnummer.label" />
                {person.fodselsnummer.verdi}
            </Normaltekst>
        </div>
    );
};

export default PersonaliaOgBarnOppsummering;
