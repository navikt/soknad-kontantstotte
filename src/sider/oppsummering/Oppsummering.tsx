import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import SideContainer from '../../component/SideContainer/SideContainer';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import { IRootState } from '../../rootReducer';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState } from '../../soknad/types';
import BarnehageplassOppsummering from './BarnehageplassOppsummering';
import { BarnOppsummering } from './BarnOppsummering';
import FamilieforholdOppsummering from './FamilieforholdOppsummering';
import KravTilSokerOppsummering from './KravTilSokerOppsummering';
import PersonaliaOppsummering from './PersonaliaOppsummering';
import UtenlandskeYtelserOppsummering from './UtenlandskeYtelserOppsummering';
import UtenlandskKontantstotteOppsummering from './UtenlandskKontantstotteOppsummering';

interface IMapStateToProps {
    soknad: ISoknadState;
}

type OppsummeringSideProps = IMapStateToProps;
const Oppsummering: React.StatelessComponent<OppsummeringSideProps> = ({ soknad }) => {
    return (
        <SideContainer className={'oppsummering'}>
            <h3 className={'typo-innholdstittel oppsummering__tittel'}>
                <FormattedMessage id={'oppsummering.tittel'} />
            </h3>

            <SoknadPanel>
                <PersonaliaOppsummering person={{ navn: '', fodselsnummer: '' }} />
                <KravTilSokerOppsummering />
                <BarnOppsummering barn={soknad.mineBarn} />
                <BarnehageplassOppsummering barnehageplass={soknad.barnehageplass} />
                <FamilieforholdOppsummering familieforhold={soknad.familieforhold} />
                <UtenlandskeYtelserOppsummering
                    familieforhold={soknad.familieforhold}
                    utenlandskeYtelser={soknad.utenlandskeYtelser}
                />
                <UtenlandskKontantstotteOppsummering
                    utenlandskKontantstotte={soknad.utenlandskKontantstotte}
                />
            </SoknadPanel>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        soknad: selectSoknad(state),
    };
};

export default connect(mapStateToProps)(Oppsummering);
