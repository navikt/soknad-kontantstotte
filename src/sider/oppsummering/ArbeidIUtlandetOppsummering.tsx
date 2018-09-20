import { Normaltekst } from 'nav-frontend-typografi';
import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IArbeidIUtlandet, IFamilieforhold, Svar } from '../../soknad/types';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IArbeidIUtlandetOppsummeringProps {
    familieforhold: IFamilieforhold;
    intl: InjectedIntl;
    arbeidIUtlandet: IArbeidIUtlandet;
}

const arbeidIUtlandetOppsummering: React.StatelessComponent<IArbeidIUtlandetOppsummeringProps> = ({
    familieforhold,
    intl,
    arbeidIUtlandet,
}) => {
    const {
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        arbeiderAnnenForelderIUtlandet,
        arbeiderAnnenForelderIUtlandetForklaring,
    } = arbeidIUtlandet;

    const { borForeldreneSammenMedBarnet } = familieforhold;

    return (
        <div className={'arbeidIUtlandet__oppsummering'}>
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({
                    id: 'arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal',
                })}
                svar={arbeiderIUtlandetEllerKontinentalsokkel.verdi}
            />
            {arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi !== '' && (
                <ul>
                    <li className="list-unstyled list-detaljer">
                        <Normaltekst>
                            <FormattedMessage id="arbeidIUtlandet.forklaring.hjelpetekst" />
                        </Normaltekst>
                        <Element className={'arbeidIUtlandet__oppsummering--forklaring'}>
                            {arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi}
                        </Element>
                    </li>
                </ul>
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <OppsummeringSporsmalSvar
                    sporsmal={intl.formatMessage({
                        id: 'arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.sporsmal',
                    })}
                    svar={arbeiderAnnenForelderIUtlandet.verdi}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                arbeiderAnnenForelderIUtlandetForklaring.verdi !== '' && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="arbeidIUtlandet.forklaring.hjelpetekst" />
                            </Normaltekst>
                            <Element className={'arbeidIUtlandet__oppsummering--forklaring'}>
                                {arbeiderAnnenForelderIUtlandetForklaring.verdi}
                            </Element>
                        </li>
                    </ul>
                )}
        </div>
    );
};

export default arbeidIUtlandetOppsummering;
