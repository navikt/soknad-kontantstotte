import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import ValidCheckboxPanelGruppe from '../../common/lib/validation/ValidCheckboxPanelGruppe';
import ValidForm from '../../common/lib/validation/ValidForm';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectKravTilSoker } from '../../soknad/selectors';
import { Felt, IKravTilSoker, Svar } from '../../soknad/types';
import { harHuketAvPaCheckbox } from '../../validators';

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: Felt, verdi: string) => void;
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

type KravTilSokerProps = IKravTilSoker & IMapDispatchToProps & InjectedIntlProps;

const KravTilSoker: React.StatelessComponent<KravTilSokerProps> = ({
    norskStatsborger,
    boddEllerJobbetINorgeSisteFemAar,
    borSammenMedBarnet,
    barnIkkeHjemme,
    ikkeAvtaltDeltBosted,
    skalBoMedBarnetINorgeNesteTolvMaaneder,
    intl,
    settCheckboxVerdi,
    nesteSteg,
}) => {
    return (
        <SideContainer>
            <Veileder
                content={
                    <div>
                        <h4 className="krav__veileder__velkomstMelding">
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
            <ValidForm summaryTitle={'Søknad om kontantstøtte'} onSubmit={nesteSteg}>
                <ValidCheckboxPanelGruppe
                    className="krav"
                    legend={''}
                    checkboxes={[
                        {
                            checked: norskStatsborger === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.norskStatsborger',
                            }),
                            value: 'norskStatsborger',
                        },
                        {
                            checked: boddEllerJobbetINorgeSisteFemAar === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.boddEllerJobbetINorgeSisteFemAar',
                            }),
                            value: 'boddEllerJobbetINorgeSisteFemAar',
                        },
                        {
                            checked: borSammenMedBarnet === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.borSammenMedBarnet',
                            }),
                            value: 'borSammenMedBarnet',
                        },
                        {
                            checked: barnIkkeHjemme === Svar.JA,
                            label: intl.formatMessage({ id: 'startside.krav.barnIkkeHjemme' }),
                            value: 'barnIkkeHjemme',
                        },
                        {
                            checked: ikkeAvtaltDeltBosted === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.ikkeAvtaltDeltBosted',
                            }),
                            value: 'ikkeAvtaltDeltBosted',
                        },
                        {
                            checked: skalBoMedBarnetINorgeNesteTolvMaaneder === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder',
                            }),
                            value: 'skalBoMedBarnetINorgeNesteTolvMaaneder',
                        },
                    ]}
                    onChange={(event: any, value: any) => {
                        handterCheckboxEndring(event, settCheckboxVerdi, value);
                    }}
                    validators={[
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(norskStatsborger),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(boddEllerJobbetINorgeSisteFemAar),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(borSammenMedBarnet),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(barnIkkeHjemme),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(ikkeAvtaltDeltBosted),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () =>
                                harHuketAvPaCheckbox(skalBoMedBarnetINorgeNesteTolvMaaneder),
                        },
                    ]}
                />
                <Submitknapp label="app.neste" />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IKravTilSoker => {
    return selectKravTilSoker(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        settCheckboxVerdi: (felt, verdi) => dispatch(soknadSettVerdi('kravTilSoker', felt, verdi)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(KravTilSoker)
);
