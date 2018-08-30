import KnappBase from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import ValidCheckboxPanelGruppe from '../../common/lib/validation/ValidCheckboxPanelGruppe';
import ValidForm from '../../common/lib/validation/ValidForm';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import SideContainer from '../../component/SideContainer/SideContainer';
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

interface IKravTilSokerState {
    submitTrykket: boolean;
}

class KravTilSoker extends React.Component<KravTilSokerProps, IKravTilSokerState> {
    constructor(props: KravTilSokerProps) {
        super(props);

        this.state = {
            submitTrykket: false,
        };
    }

    public render() {
        const {
            barnIkkeHjemme,
            boddEllerJobbetINorgeSisteFemAar,
            borSammenMedBarnet,
            ikkeAvtaltDeltBosted,
            norskStatsborger,
            skalBoMedBarnetINorgeNesteTolvMaaneder,
            intl,
            settCheckboxVerdi,
            nesteSteg,
        } = this.props;

        const valideringsFeil =
            (harHuketAvPaCheckbox(norskStatsborger) ||
                harHuketAvPaCheckbox(boddEllerJobbetINorgeSisteFemAar) ||
                harHuketAvPaCheckbox(borSammenMedBarnet) ||
                harHuketAvPaCheckbox(barnIkkeHjemme) ||
                harHuketAvPaCheckbox(ikkeAvtaltDeltBosted) ||
                harHuketAvPaCheckbox(skalBoMedBarnetINorgeNesteTolvMaaneder)) &&
            this.state.submitTrykket;

        return (
            <SideContainer>
                <div className="veileder">
                    <Veilederpanel svg={<Veilederikon morkBakgrunn />} type="normal" kompakt={true}>
                        <h4 className="krav__veileder__velkomstMelding">
                            {intl.formatMessage({
                                id: 'startside.krav.velkomstMelding',
                            })}
                        </h4>
                        {intl.formatMessage({
                            id: 'startside.krav.veileder',
                        })}
                    </Veilederpanel>
                </div>
                <ValidForm
                    summaryTitle={'Søknad om kontantstøtte'}
                    onSubmit={() => {
                        nesteSteg();
                        this.setState({ submitTrykket: false });
                    }}
                >
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
                    {valideringsFeil && (
                        <Veileder
                            className="krav"
                            type="advarsel"
                            fargetema="advarsel"
                            posisjon="høyre"
                            center
                            tekst={intl.formatMessage({
                                id: 'startside.krav.feil.advarsel',
                            })}
                            storrelse="M"
                        >
                            <Veilederikon morkBakgrunn={true} />
                        </Veileder>
                    )}
                    <KnappBase
                        onClick={() => {
                            this.setState({ submitTrykket: true });
                        }}
                        type="hoved"
                        htmlType="submit"
                    >
                        <FormattedMessage id={'app.neste'} />
                    </KnappBase>
                </ValidForm>
            </SideContainer>
        );
    }
}

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
