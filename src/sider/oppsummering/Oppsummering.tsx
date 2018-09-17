import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState } from '../../soknad/types';
import ArbeidsforholdOppsummering from './ArbeidsforholdOppsummering';
import BarnehageplassOppsummering from './BarnehageplassOppsummering';
import FamilieforholdOppsummering from './FamilieforholdOppsummering';
import KravTilSokerOppsummering from './KravTilSokerOppsummering';
import PersonaliaOgBarnOppsummering from './PersonaliaOgBarnOppsummering';
import UtenlandskKontantstotteOppsummering from './UtenlandskKontantstotteOppsummering';
import UtenlandskeYtelserOppsummering from './UtenlandskeYtelserOppsummering';

interface IMapStateToProps {
    soknad: ISoknadState;
}

type OppsummeringSideProps = IMapStateToProps & InjectedIntlProps;
const Oppsummering: React.StatelessComponent<OppsummeringSideProps> = ({ intl, soknad }) => {
    return (
        <SideContainer>
            <h1>Oversikt over hva du har fylt ut</h1>

            <ul>
                <PersonaliaOgBarnOppsummering
                    person={{ navn: '', fodselsnummer: '' }}
                    barnet={soknad.mineBarn}
                />
                <KravTilSokerOppsummering intl={intl} kravTilSoker={soknad.kravTilSoker} />
                <FamilieforholdOppsummering intl={intl} familieforhold={soknad.familieforhold} />
                <BarnehageplassOppsummering intl={intl} barnehageplass={soknad.barnehageplass} />
                <ArbeidsforholdOppsummering intl={intl} arbeidsforhold={soknad.arbeidsforhold} />
                <UtenlandskeYtelserOppsummering
                    intl={intl}
                    familieforhold={soknad.familieforhold}
                    utenlandskeYtelser={soknad.utenlandskeYtelser}
                />
                <UtenlandskKontantstotteOppsummering
                    intl={intl}
                    utenlandskKontantstotte={soknad.utenlandskKontantstotte}
                />
            </ul>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        soknad: selectSoknad(state),
    };
};

export default connect(mapStateToProps)(injectIntl(Oppsummering));
