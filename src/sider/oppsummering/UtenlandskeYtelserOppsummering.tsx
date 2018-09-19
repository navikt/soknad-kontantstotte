import { Normaltekst } from 'nav-frontend-typografi';
import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IFamilieforhold, IUtenlandskeYtelser, Svar } from '../../soknad/types';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IUtenlandskeYtelserOppsummeringProps {
    familieforhold: IFamilieforhold;
    intl: InjectedIntl;
    utenlandskeYtelser: IUtenlandskeYtelser;
}

const utenlandskeYtelserOppsummering: React.StatelessComponent<
    IUtenlandskeYtelserOppsummeringProps
> = ({ familieforhold, intl, utenlandskeYtelser }) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskeYtelser;

    const { borForeldreneSammenMedBarnet } = familieforhold;

    return (
        <div className={'utenlandskeYtelser__oppsummering'}>
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({
                    id: 'oppsummering.utenlandskeYtelser.mottarYtelserFraUtland',
                })}
                svar={mottarYtelserFraUtland.verdi}
            />
            {mottarYtelserFraUtlandForklaring.verdi !== '' && (
                <ul>
                    <li className="list-unstyled list-detaljer">
                        <Normaltekst>
                            <FormattedMessage id="oppsummering.utenlandskeYtelser.forklaring.label" />
                        </Normaltekst>
                        <Element className={'utenlandskeYtelser__oppsummering--forklaring'}>
                            {mottarYtelserFraUtlandForklaring.verdi}
                        </Element>
                    </li>
                </ul>
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <OppsummeringSporsmalSvar
                    sporsmal={intl.formatMessage({
                        id: 'oppsummering.utenlandskeYtelser.mottarAnnenForelderYtelserFraUtland',
                    })}
                    svar={mottarAnnenForelderYtelserFraUtland.verdi}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                mottarAnnenForelderYtelserFraUtlandForklaring.verdi !== '' && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.utenlandskeYtelser.forklaring.label" />
                            </Normaltekst>
                            <Element className={'utenlandskeYtelser__oppsummering--forklaring'}>
                                {mottarAnnenForelderYtelserFraUtlandForklaring.verdi}
                            </Element>
                        </li>
                    </ul>
                )}
        </div>
    );
};

export default utenlandskeYtelserOppsummering;
