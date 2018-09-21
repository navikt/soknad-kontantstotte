import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import SideContainer from '../../component/SideContainer/SideContainer';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState, Svar, ValideringsStatus } from '../../soknad/types';
import BarnehageplassOppsummering from './BarnehageplassOppsummering';
import { BarnOppsummering } from './BarnOppsummering';
import FamilieforholdOppsummering from './FamilieforholdOppsummering';
import KravTilSokerOppsummering from './KravTilSokerOppsummering';
import PersonaliaOppsummering from './PersonaliaOppsummering';
import UtenlandskeYtelserOppsummering from './UtenlandskeYtelserOppsummering';

interface IMapStateToProps {
    soknad: ISoknadState;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settBekreftelse: (verdi: Svar) => void;
}

type OppsummeringSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Oppsummering: React.StatelessComponent<OppsummeringSideProps> = ({
    harForsoktNesteSteg,
    intl,
    settBekreftelse,
    soknad,
}) => {
    return (
        <SideContainer
            className={'oppsummering'}
            tittel={<FormattedMessage id={'oppsummering.tittel'} />}
        >
            <SoknadPanel className={'oppsummering__panel'}>
                <PersonaliaOppsummering person={{ navn: '', fodselsnummer: '' }} />
                <KravTilSokerOppsummering />
                <BarnOppsummering barn={soknad.mineBarn} />
                <BarnehageplassOppsummering barnehageplass={soknad.barnehageplass} />
                <FamilieforholdOppsummering familieforhold={soknad.familieforhold} />
                <UtenlandskeYtelserOppsummering
                    familieforhold={soknad.familieforhold}
                    utenlandskeYtelser={soknad.utenlandskeYtelser}
                />
            </SoknadPanel>
            <BekreftCheckboksPanel
                className={'oppsummering__bekreftelse'}
                onChange={(evt: React.SyntheticEvent<EventTarget>) => {
                    const target = evt.nativeEvent.target as HTMLInputElement;
                    settBekreftelse(target.checked ? Svar.JA : Svar.NEI);
                }}
                checked={soknad.oppsummering.bekreftelse.verdi === Svar.JA}
                label={intl.formatMessage({ id: 'oppsummering.bekreftelse.label' })}
            />
            {harForsoktNesteSteg &&
                soknad.oppsummering.bekreftelse.valideringsStatus !== ValideringsStatus.OK && (
                    <FormattedMessage id={soknad.oppsummering.bekreftelse.feilmeldingsNokkel}>
                        {txt => <div className={'skjemaelement__feilmelding'}>{txt}</div>}
                    </FormattedMessage>
                )}
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soknad: selectSoknad(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBekreftelse: (verdi: Svar) =>
            dispatch(soknadValiderFelt('oppsummering', 'bekreftelse', verdi)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Oppsummering));
