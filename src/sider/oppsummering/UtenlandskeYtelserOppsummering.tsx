import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { IFamilieforhold, IUtenlandskeYtelser, Svar } from '../../soknad/types';
import { OppsummeringSteg } from './OppsummeringSteg';
import { SporsmalSvar } from './SporsmalSvar';

interface IUtenlandskeYtelserOppsummeringProps {
    familieforhold: IFamilieforhold;
    utenlandskeYtelser: IUtenlandskeYtelser;
}

const utenlandskeYtelserOppsummering: React.StatelessComponent<
    IUtenlandskeYtelserOppsummeringProps
> = ({ familieforhold, utenlandskeYtelser }) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskeYtelser;

    const { borForeldreneSammenMedBarnet } = familieforhold;

    return (
        <OppsummeringSteg>
            <Element>
                <FormattedMessage id={'utenlandskeYtelser.tittel'} />
            </Element>
            <SporsmalSvar
                sporsmal={
                    <FormattedMessage
                        id={'oppsummering.utenlandskeYtelser.mottarYtelserFraUtland'}
                    />
                }
                svar={mottarYtelserFraUtland.verdi}
            />
            {mottarYtelserFraUtland.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage id={'oppsummering.utenlandskeYtelser.forklaring.label'} />
                    }
                    svar={mottarYtelserFraUtlandForklaring.verdi}
                />
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <SporsmalSvar
                    sporsmal={
                        <FormattedMessage
                            id={
                                'oppsummering.utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland'
                            }
                        />
                    }
                    svar={mottarAnnenForelderYtelserFraUtland.verdi}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA && (
                    <SporsmalSvar
                        sporsmal={
                            <FormattedMessage
                                id={'oppsummering.utenlandskeYtelser.forklaring.label'}
                            />
                        }
                        svar={mottarAnnenForelderYtelserFraUtlandForklaring.verdi}
                    />
                )}
        </OppsummeringSteg>
    );
};

export default utenlandskeYtelserOppsummering;
