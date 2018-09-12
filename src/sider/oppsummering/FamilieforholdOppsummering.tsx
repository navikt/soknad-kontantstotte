import Element from 'nav-frontend-typografi/lib/element';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFamilieforhold, Svar } from '../../soknad/types';
import OppsummeringsListeElement from './OppsummeringsListeElement';

interface IFamilieforholdOppsummering {
    intl: InjectedIntl;
    familieforhold: IFamilieforhold;
}

type FamilieforholdOppsummeringProps = IFamilieforholdOppsummering;

const FamilieforholdOppsummering: React.StatelessComponent<FamilieforholdOppsummeringProps> = ({
    intl,
    familieforhold,
}) => {
    return (
        <>
            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.NEI && (
                <>
                    <OppsummeringsListeElement
                        tekst={intl.formatMessage({
                            id: 'oppsummering.familieforhold.foreldreBorIkkeSammen',
                        })}
                    />
                </>
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <OppsummeringsListeElement
                    tekst={intl.formatMessage({
                        id: 'oppsummering.familieforhold.foreldreBorSammen',
                    })}
                >
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                {intl.formatMessage({
                                    id: 'oppsummering.familieforhold.annenForelderNavn.label',
                                })}
                            </Normaltekst>
                            <Element>{familieforhold.annenForelderNavn.verdi}</Element>
                            <br />
                            <Normaltekst>
                                {intl.formatMessage({
                                    id:
                                        'oppsummering.familieforhold.annenForelderFodselsnummer.label',
                                })}
                            </Normaltekst>
                            <Element>{familieforhold.annenForelderFodselsnummer.verdi}</Element>
                        </li>
                    </ul>
                </OppsummeringsListeElement>
            )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.verdi === Svar.JA && (
                    <OppsummeringsListeElement
                        tekst={intl.formatMessage({
                            id:
                                'oppsummering.familieforhold.annenForelderHarBoddEllerVaertYrkesaktiv',
                        })}
                    />
                )}

            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                familieforhold.annenForelderYrkesaktivINorgeEOSIMinstFemAar.verdi === Svar.NEI && (
                    <OppsummeringsListeElement
                        tekst={intl.formatMessage({
                            id:
                                'oppsummering.familieforhold.annenForelderHarIkkeBoddEllerVaertYrkesaktiv',
                        })}
                    />
                )}
        </>
    );
};

export default FamilieforholdOppsummering;
