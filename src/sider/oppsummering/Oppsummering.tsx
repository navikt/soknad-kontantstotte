import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import SideContainer from '../../component/SideContainer/SideContainer';
import SoknadPanel from '../../component/SoknadPanel/SoknadPanel';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { ISoker } from '../../soker/types';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState, Svar, ValideringsStatus } from '../../soknad/types';
import { isEnabled } from '../../toggles/selectors';
import { IToggleName } from '../../toggles/types';
import ArbeidIUtlandetOppsummering from './ArbeidIUtlandetOppsummering';
import BarnehageplassOppsummering from './BarnehageplassOppsummering';
import { BarnOppsummering } from './BarnOppsummering';
import FamilieforholdOppsummering from './FamilieforholdOppsummering';
import KravTilSokerOppsummering from './KravTilSokerOppsummering';
import PersonaliaOppsummering from './PersonaliaOppsummering';
import TilknytningTilUtlandOppsummering from './TilknytningTilUtlandOppsummering';
import UtenlandskeYtelserOppsummering from './UtenlandskeYtelserOppsummering';
import UtenlandskKontantstotteOppsummering from './UtenlandskKontantstotteOppsummering';

interface IMapStateToProps {
    soker: ISoker;
    soknad: ISoknadState;
    harForsoktNesteSteg: boolean;
    visOppsummeringAdvarsel: boolean;
}

interface IMapDispatchToProps {
    settBekreftelse: (verdi: Svar) => void;
}

type OppsummeringSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Oppsummering: React.StatelessComponent<OppsummeringSideProps> = ({
    harForsoktNesteSteg,
    intl,
    settBekreftelse,
    soker,
    soknad,
    visOppsummeringAdvarsel,
}) => {
    return (
        <SideContainer
            className={'oppsummering'}
            tittel={<FormattedMessage id={'oppsummering.tittel'} />}
        >
            <Veileder
                content={
                    <div>
                        <h4 className={'oppsummering__veileder-tittel'}>
                            {intl.formatMessage({ id: 'oppsummering.veileder.tittel' })}
                        </h4>
                        <FormattedMessage id={'oppsummering.veileder.info'} />
                    </div>
                }
                className={'oppsummering__veileder'}
            />
            <SoknadPanel className={'oppsummering__panel'}>
                <PersonaliaOppsummering soker={{ fodselsnummer: soker.innloggetSom }} />
                <KravTilSokerOppsummering />
                <BarnOppsummering barn={soknad.mineBarn} />
                <BarnehageplassOppsummering
                    barnehageplass={soknad.barnehageplass}
                    visOppsummeringAdvarsel={visOppsummeringAdvarsel}
                />
                <FamilieforholdOppsummering familieforhold={soknad.familieforhold} />
                <TilknytningTilUtlandOppsummering
                    familieforhold={soknad.familieforhold}
                    tilknytningTilUtland={soknad.tilknytningTilUtland}
                />
                <ArbeidIUtlandetOppsummering
                    familieforhold={soknad.familieforhold}
                    arbeidIUtlandet={soknad.arbeidIUtlandet}
                />
                <UtenlandskeYtelserOppsummering
                    familieforhold={soknad.familieforhold}
                    utenlandskeYtelser={soknad.utenlandskeYtelser}
                />
                <UtenlandskKontantstotteOppsummering
                    utenlandskKontantstotte={soknad.utenlandskKontantstotte}
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
        soker: selectSoker(state),
        soknad: selectSoknad(state),
        visOppsummeringAdvarsel: isEnabled(state, IToggleName.vis_oppsummering_advarsel),
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
