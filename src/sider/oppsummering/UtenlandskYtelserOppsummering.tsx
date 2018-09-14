import { Normaltekst } from 'nav-frontend-typografi';
import Element from 'nav-frontend-typografi/lib/element';
import * as React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';
import { IFamilieforhold, IUtenlandskYtelser, Svar } from '../../soknad/types';
import OppsummeringSporsmalSvar from './OppsummeringSporsmalSvar';

interface IUtenlandskYtelserOppsummeringProps {
    familieforhold: IFamilieforhold;
    intl: InjectedIntl;
    utenlandskYtelser: IUtenlandskYtelser;
}

const UtenlandskYtelserOppsummering: React.StatelessComponent<
    IUtenlandskYtelserOppsummeringProps
> = ({ familieforhold, intl, utenlandskYtelser }) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskYtelser;

    const { borForeldreneSammenMedBarnet } = familieforhold;

    return (
        <div className={'utenlandskYtelser__oppsummering'}>
            <OppsummeringSporsmalSvar
                sporsmal={intl.formatMessage({
                    id: 'oppsummering.utenlandskYtelser.mottarYtelserFraUtland',
                })}
                svar={mottarYtelserFraUtland.verdi}
            />
            {mottarYtelserFraUtlandForklaring.verdi !== '' && (
                <ul>
                    <li className="list-unstyled list-detaljer">
                        <Normaltekst>
                            <FormattedMessage id="oppsummering.utenlandskYtelser.forklaring.label" />
                        </Normaltekst>
                        <Element className={'utenlandskYtelser__oppsummering--forklaring'}>
                            {mottarYtelserFraUtlandForklaring.verdi}
                        </Element>
                    </li>
                </ul>
            )}

            {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <OppsummeringSporsmalSvar
                    sporsmal={intl.formatMessage({
                        id: 'oppsummering.utenlandskYtelser.mottarAnnenForelderYtelserFraUtland',
                    })}
                    svar={mottarAnnenForelderYtelserFraUtland.verdi}
                />
            )}
            {borForeldreneSammenMedBarnet.verdi === Svar.JA &&
                mottarAnnenForelderYtelserFraUtlandForklaring.verdi !== '' && (
                    <ul>
                        <li className="list-unstyled list-detaljer">
                            <Normaltekst>
                                <FormattedMessage id="oppsummering.utenlandskYtelser.forklaring.label" />
                            </Normaltekst>
                            <Element className={'utenlandskYtelser__oppsummering--forklaring'}>
                                {mottarAnnenForelderYtelserFraUtlandForklaring.verdi}
                            </Element>
                        </li>
                    </ul>
                )}
        </div>
    );
};

export default UtenlandskYtelserOppsummering;
