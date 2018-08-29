import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import ValidCheckboxPanelGruppe from '../../common/lib/validation/ValidCheckboxPanelGruppe';
import ValidForm from '../../common/lib/validation/ValidForm';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
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
    boddINorgeSisteFemAar,
    borSammenMedBarnet,
    intl,
    skalBoMedBarnetINorgeNesteTolvMaaneder,
    settCheckboxVerdi,
    nesteSteg,
}) => {
    const sporsmaal: string = intl.formatMessage({ id: 'startside.krav.sporsmal' });

    return (
        <SideContainer>
            <ValidForm summaryTitle={'Søknad om kontantstøtte'} onSubmit={nesteSteg}>
                <ValidCheckboxPanelGruppe
                    legend={sporsmaal}
                    checkboxes={[
                        {
                            checked: boddINorgeSisteFemAar === Svar.JA,
                            label: intl.formatMessage({
                                id: 'startside.krav.boddINorgeSisteFemAar',
                            }),
                            value: 'boddINorgeSisteFemAar',
                        },
                        {
                            checked: borSammenMedBarnet === Svar.JA,
                            label: intl.formatMessage({ id: 'startside.krav.borSammenMedBarnet' }),
                            value: 'borSammenMedBarnet',
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
                            test: () => harHuketAvPaCheckbox(boddINorgeSisteFemAar),
                        },
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                            test: () => harHuketAvPaCheckbox(borSammenMedBarnet),
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
