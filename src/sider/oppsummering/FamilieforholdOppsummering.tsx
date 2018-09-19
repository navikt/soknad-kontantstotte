import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, Svar } from '../../soknad/types';
import { OppsummeringPanel } from './OppsummeringPanel';
import { SporsmalSvar } from './SporsmalSvar';

interface IFamilieforholdOppsummering {
    familieforhold: IFamilieforhold;
}

type FamilieforholdOppsummeringProps = IFamilieforholdOppsummering;

const FamilieforholdOppsummering: React.StatelessComponent<FamilieforholdOppsummeringProps> = ({
    familieforhold,
}) => {
    return (
        <OppsummeringPanel>
            <Element>
                <FormattedMessage id={'familieforhold.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage id={'familieforhold.borForeldreneSammenMedBarnet.sporsmal'} />
                }
                svar={familieforhold.borForeldreneSammenMedBarnet.verdi}
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
        </OppsummeringPanel>
    );
};

export default FamilieforholdOppsummering;
