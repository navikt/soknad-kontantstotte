import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IArbeidsforhold, Svar } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IArbeidsforholdOppsummeringProps {
    arbeidsforhold: IArbeidsforhold;
    intl: InjectedIntl;
}

const ArbeidsforholdOppsummering: React.StatelessComponent<IArbeidsforholdOppsummeringProps> = ({
    arbeidsforhold,
    intl,
}) => {
    return (
        <>
            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id:
                        'oppsummering.arbeidsforhold.mottarYtelserFraUtlandet.' +
                        arbeidsforhold.mottarYtelserFraUtlandet.toLowerCase(),
                })}
            >
                {arbeidsforhold.mottarYtelserFraUtlandet === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>{arbeidsforhold.mottarYtelserFraUtlandetForklaring}</Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>

            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id:
                        'oppsummering.arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.' +
                        arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.toLowerCase(),
                })}
            >
                {arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>
                                {arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkelForklaring}
                            </Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>

            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id:
                        'oppsummering.arbeidsforhold.mottarKontantstotteFraAnnetEOS.' +
                        arbeidsforhold.mottarKontantstotteFraAnnetEOS.toLowerCase(),
                })}
            >
                {arbeidsforhold.mottarKontantstotteFraAnnetEOS === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>
                                {arbeidsforhold.mottarKontantstotteFraAnnetEOSForklaring}
                            </Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>
        </>
    );
};

export default ArbeidsforholdOppsummering;
