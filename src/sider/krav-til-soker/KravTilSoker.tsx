import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValidertFelt } from '../../soknad/actions';
import { selectKravTilSoker } from '../../soknad/selectors';
import { Feltnavn, IFelt, IKravTilSoker, Svar, ValideringsStatus } from '../../soknad/types';

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: Feltnavn, verdi: string) => void;
    nesteSteg: () => void;
}

const handterCheckboxEndring = (
    event: React.SyntheticEvent<EventTarget>,
    handler: any,
    value?: string
) => {
    const target = event.nativeEvent.target as HTMLInputElement;
    handler(value, target.checked ? Svar.JA : Svar.UBESVART);
};

interface IMapStateToProps {
    kravTilSoker: IKravTilSoker;
    feil?: { feilmelding: string };
}

type KravTilSokerProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const KravTilSoker: React.StatelessComponent<KravTilSokerProps> = ({
    kravTilSoker,
    feil,
    intl,
    settCheckboxVerdi,
    nesteSteg,
}) => {
    return (
        <SideContainer>
            <Veileder
                content={
                    <div>
                        <h4 className="krav__velkomst-melding">
                            {intl.formatMessage({
                                id: 'startside.krav.velkomstMelding',
                            })}
                        </h4>
                        <span>
                            {intl.formatMessage({
                                id: 'startside.krav.veileder',
                            })}
                        </span>
                    </div>
                }
            />
            <form>
                <CheckboksPanelGruppe
                    className="krav__inputPanelGruppe"
                    legend={''}
                    checkboxes={[
                        {
                            checked: kravTilSoker.norskStatsborger.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.norskStatsborger',
                            }),
                            value: 'norskStatsborger',
                        },
                        {
                            checked:
                                kravTilSoker.boddEllerJobbetINorgeSisteFemAar.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.boddEllerJobbetINorgeSisteFemAar',
                            }),
                            value: 'boddEllerJobbetINorgeSisteFemAar',
                        },
                        {
                            checked: kravTilSoker.borSammenMedBarnet.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.borSammenMedBarnet',
                            }),
                            value: 'borSammenMedBarnet',
                        },
                        {
                            checked: kravTilSoker.barnIkkeHjemme.verdi === Svar.JA,
                            label: intl.formatMessage({ id: 'startside.krav.barnIkkeHjemme' }),
                            value: 'barnIkkeHjemme',
                        },
                        {
                            checked: kravTilSoker.ikkeAvtaltDeltBosted.verdi === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.ikkeAvtaltDeltBosted',
                            }),
                            value: 'ikkeAvtaltDeltBosted',
                        },
                        {
                            checked:
                                kravTilSoker.skalBoMedBarnetINorgeNesteTolvMaaneder.verdi ===
                                Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder',
                            }),
                            value: 'skalBoMedBarnetINorgeNesteTolvMaaneder',
                        },
                    ]}
                    onChange={(event: any, value: any) => {
                        handterCheckboxEndring(event, settCheckboxVerdi, value);
                    }}
                    feil={feil}
                />
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    const kravTilSoker = selectKravTilSoker(state);
    const feltMedFeil = Object.values(kravTilSoker).filter(
        (felt: IFelt) => felt.valideringsStatus !== ValideringsStatus.OK
    );
    return {
        feil:
            feltMedFeil.length > 0 && selectHarForsoktNesteSteg(state)
                ? { feilmelding: feltMedFeil[0].feilmeldingsNokkel }
                : undefined,
        kravTilSoker,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settCheckboxVerdi: (felt, verdi) =>
            dispatch(soknadValidertFelt('kravTilSoker', felt, verdi)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(KravTilSoker)
);
