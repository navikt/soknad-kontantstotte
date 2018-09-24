import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IArbeidIUtlandet, IFamilieforhold, Svar } from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IArbeidIUtlandetOppsummeringProps {
    familieforhold: IFamilieforhold;
    arbeidIUtlandet: IArbeidIUtlandet;
}

const arbeidIUtlandetOppsummering: React.StatelessComponent<IArbeidIUtlandetOppsummeringProps> = ({
    familieforhold,
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
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'arbeidIUtlandet.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={'arbeidIUtlandet.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal'}
                    />
                }
                svar={arbeiderIUtlandetEllerKontinentalsokkel.verdi}
            />
            {arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi !== '' && (
                <SporsmalSvar
                    sporsmal={<FormattedMessage id={'arbeidIUtlandet.forklaring.hjelpetekst'} />}
                    svar={arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi}
                />
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={'arbeidIUtlandet.arbeiderAnnenForelderIUtlandet.sporsmal'}
                        />
                    }
                    svar={arbeiderAnnenForelderIUtlandet.verdi}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                arbeiderAnnenForelderIUtlandetForklaring.verdi !== '' && (
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage id={'arbeidIUtlandet.forklaring.hjelpetekst'} />
                        }
                        svar={arbeiderAnnenForelderIUtlandetForklaring.verdi}
                    />
                )}
        </OppsummeringSteg>
    );
};

export default arbeidIUtlandetOppsummering;
