import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, Svar } from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IFamilieforholdOppsummering {
    familieforhold: IFamilieforhold;
}

type FamilieforholdOppsummeringProps = IFamilieforholdOppsummering;

const FamilieforholdOppsummering: React.StatelessComponent<FamilieforholdOppsummeringProps> = ({
    familieforhold,
}) => {
    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'familieforhold.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage id={'familieforhold.borForeldreneSammenMedBarnet.sporsmal'} />
                }
                svar={
                    <FormattedMessage
                        id={
                            familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA
                                ? 'svar.ja'
                                : 'svar.nei'
                        }
                    />
                }
            />
            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <>
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'oppsummering.familieforhold.annenForelderNavn.label'}
                            />
                        }
                        svar={familieforhold.annenForelderNavn.verdi}
                    />
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'oppsummering.familieforhold.annenForelderFodselsnummer.label'}
                            />
                        }
                        svar={familieforhold.annenForelderFodselsnummer.verdi}
                    />
                </>
            )}
        </OppsummeringSteg>
    );
};

export default FamilieforholdOppsummering;
