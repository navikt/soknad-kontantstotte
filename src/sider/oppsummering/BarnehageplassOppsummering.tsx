import { dagDatoNøkkel } from 'nav-datovelger/dist/datovelger/utils';
import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { BarnehageplassVerdier, IBarnehageplass } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IBarnehageplassOppsummeringProps {
    barnehageplass: IBarnehageplass;
    intl: InjectedIntl;
}

const BarnehageplassOppsummering: React.StatelessComponent<IBarnehageplassOppsummeringProps> = ({
    barnehageplass,
    intl,
}) => {
    switch (barnehageplass.harBarnehageplass.verdi) {
        case BarnehageplassVerdier.Ja:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({ id: 'oppsummering.barnehageplass.harPlass' })}
                >
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.dato.label" />
                            </Normaltekst>
                            <Element>{dagDatoNøkkel(new Date(barnehageplass.dato.verdi))}</Element>

                            <br />

                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.kommune.label" />
                            </Normaltekst>
                            <Element>{barnehageplass.kommune.verdi}</Element>

                            <br />

                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.antallTimer.label" />
                            </Normaltekst>
                            <Element>{barnehageplass.antallTimer.verdi}</Element>
                        </li>
                    </ul>
                </OppsummeringsListeElement>
            );
        case BarnehageplassVerdier.JaSkalSlutte:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({
                        id: 'oppsummering.barnehageplass.harPlassMenSkalSlutte',
                    })}
                >
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.dato.label" />
                            </Normaltekst>
                            <Element>{dagDatoNøkkel(new Date(barnehageplass.dato.verdi))}</Element>

                            <br />

                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.kommune.label" />
                            </Normaltekst>
                            <Element>{barnehageplass.kommune.verdi}</Element>

                            <br />

                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.antallTimer.label" />
                            </Normaltekst>
                            <Element>{barnehageplass.antallTimer.verdi}</Element>
                        </li>
                    </ul>
                </OppsummeringsListeElement>
            );
        case BarnehageplassVerdier.NeiHarFaatt:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({
                        id: 'oppsummering.barnehageplass.neiMenHarFattPlass',
                    })}
                >
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.dato.label" />
                            </Normaltekst>
                            <Element>{dagDatoNøkkel(new Date(barnehageplass.dato.verdi))}</Element>

                            <br />

                            <Normaltekst>
                                <FormattedMessage id="oppsummering.barnehageplass.kommune.label" />
                            </Normaltekst>
                            <Element>{barnehageplass.kommune.verdi}</Element>
                        </li>
                    </ul>
                </OppsummeringsListeElement>
            );
        case BarnehageplassVerdier.Nei:
            return (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({ id: 'oppsummering.barnehageplass.harIkkePlass' })}
                />
            );
        default:
            return null;
    }
};

export default BarnehageplassOppsummering;
