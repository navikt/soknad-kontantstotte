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
            } else if (verdi === Svar.NEI) {
                return 'oppsummering.arbeidsforhold.mottarYtelserFraUtlandet.nei';
            }
        case 'arbeiderIUtlandetEllerKontinentalsokkel':
            if (verdi === Svar.JA) {
                return 'oppsummering.arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.ja';
            } else if (verdi === Svar.NEI) {
                return 'oppsummering.arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.nei';
            }
        case 'mottarKontantstotteFraAnnetEOS':
            if (verdi === Svar.JA) {
                return 'oppsummering.arbeidsforhold.mottarKontantstotteFraAnnetEOS.ja';
            } else if (verdi === Svar.NEI) {
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
                        arbeidsforhold.mottarYtelserFraUtlandet
                    ),
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
                    id: oppsummeringsNokkel(
                        'arbeiderIUtlandetEllerKontinentalsokkel',
                        arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel
                    ),
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
                    id: oppsummeringsNokkel(
                        'mottarKontantstotteFraAnnetEOSForklaring',
                        arbeidsforhold.mottarKontantstotteFraAnnetEOSForklaring
                    ),
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
