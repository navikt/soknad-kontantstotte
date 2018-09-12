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

const oppsummeringsNokkel = (felt: string, verdi: string) => {
    switch (felt) {
        case 'mottarYtelserFraUtlandet':
            if (verdi === Svar.JA) {
                return 'oppsummering.arbeidsforhold.mottarYtelserFraUtlandet.ja';
            } else {
                return 'oppsummering.arbeidsforhold.mottarYtelserFraUtlandet.nei';
            }
        case 'arbeiderIUtlandetEllerKontinentalsokkel':
            if (verdi === Svar.JA) {
                return 'oppsummering.arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.ja';
            } else {
                return 'oppsummering.arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.nei';
            }
        case 'mottarKontantstotteFraAnnetEOS':
            if (verdi === Svar.JA) {
                return 'oppsummering.arbeidsforhold.mottarKontantstotteFraAnnetEOS.ja';
            } else {
                return 'oppsummering.arbeidsforhold.mottarKontantstotteFraAnnetEOS.nei';
            }
        default:
            return '';
    }
};

const ArbeidsforholdOppsummering: React.StatelessComponent<IArbeidsforholdOppsummeringProps> = ({
    arbeidsforhold,
    intl,
}) => {
    return (
        <>
            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: oppsummeringsNokkel(
                        'mottarYtelserFraUtlandet',
                        arbeidsforhold.mottarYtelserFraUtlandet.verdi
                    ),
                })}
            >
                {arbeidsforhold.mottarYtelserFraUtlandet.verdi === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>
                                {arbeidsforhold.mottarYtelserFraUtlandetForklaring.verdi}
                            </Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>

            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: oppsummeringsNokkel(
                        'arbeiderIUtlandetEllerKontinentalsokkel',
                        arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.verdi
                    ),
                })}
            >
                {arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.verdi === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>
                                {
                                    arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkelForklaring
                                        .verdi
                                }
                            </Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>

            <OppsummeringsListeElement
                tekst={intl.formatMessage({
                    id: oppsummeringsNokkel(
                        'mottarKontantstotteFraAnnetEOS',
                        arbeidsforhold.mottarKontantstotteFraAnnetEOS.verdi
                    ),
                })}
            >
                {arbeidsforhold.mottarKontantstotteFraAnnetEOS.verdi === Svar.JA && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.arbeidsforhold.tilleggsinformasjon.label" />
                            </Normaltekst>
                            <Element>
                                {arbeidsforhold.mottarKontantstotteFraAnnetEOSForklaring.verdi}
                            </Element>
                        </li>
                    </ul>
                )}
            </OppsummeringsListeElement>
        </>
    );
};

export default ArbeidsforholdOppsummering;
