import PanelBase from 'nav-frontend-paneler';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import TextareaControlled from 'nav-frontend-skjema/lib/textarea-controlled';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import UtenlandskYtelserIkon from '../../component/Ikoner/UtenlandskYtelserIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold, selectYtelserFraUtland } from '../../soknad/selectors';
import { Feltnavn, IFamilieforhold, IUtenlandskYtelser, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nullstillNesteSteg: () => void;
    settStringFelt: (feltnavn: Feltnavn, verdi: string) => void;
    settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => void;
}

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    harForsoktNesteSteg: boolean;
    utenlandskYtelser: IUtenlandskYtelser;
}

type UtenlandskYtelserProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const UtenlandskYtelser: React.StatelessComponent<UtenlandskYtelserProps> = ({
    familieforhold,
    harForsoktNesteSteg,
    intl,
    nullstillNesteSteg,
    settStringFelt,
    settSvarFelt,
    utenlandskYtelser,
}) => {
    const {
        mottarYtelserFraUtland,
        mottarYtelserFraUtlandForklaring,
        mottarAnnenForelderYtelserFraUtland,
        mottarAnnenForelderYtelserFraUtlandForklaring,
    } = utenlandskYtelser;
    const { borForeldreneSammenMedBarnet } = familieforhold;
    const feltMedFeil = hentFeltMedFeil(utenlandskYtelser, harForsoktNesteSteg, intl);
    const annenForelderLabel = intl.formatMessage({
        id: 'utenlandskYtelser.mottarAnnenForelderYtelserFraUtland.annenForelder',
    });

    return (
        <SideContainer
            className={'utenlandsk-ytelser'}
            ikon={<UtenlandskYtelserIkon />}
            tittel={intl.formatMessage({ id: 'utenlandskYtelser.tittel' })}
        >
            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'utenlandskYtelser.mottarYtelserFraUtland.sporsmal',
                    })}
                    name={'mottarYtelserFraUtland'}
                    className={'side-container__children__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvarFelt('mottarYtelserFraUtland' as Feltnavn, value as Svar);
                        nullstillNesteSteg();
                    }}
                    checked={mottarYtelserFraUtland.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                    feil={feltMedFeil.mottarYtelserFraUtland}
                />
                {mottarYtelserFraUtland.verdi === Svar.JA && (
                    <PanelBase className={'utenlandsk-ytelser__panel'}>
                        <TextareaControlled
                            label={intl.formatMessage({
                                id: 'utenlandskYtelser.forklaring.hjelpetekst',
                            })}
                            defaultValue={mottarYtelserFraUtlandForklaring.verdi}
                            maxLength={500}
                            onBlur={(evt: any) => {
                                settStringFelt(
                                    'mottarYtelserFraUtlandForklaring' as Feltnavn,
                                    evt.target.value
                                );
                            }}
                            feil={feltMedFeil.mottarYtelserFraUtlandForklaring}
                        />
                    </PanelBase>
                )}

                {borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <RadioPanelGruppe
                        legend={intl.formatMessage(
                            {
                                id:
                                    'utenlandskYtelser.mottarAnnenForelderYtelserFraUtland.sporsmal',
                            },
                            { navn: annenForelderLabel }
                        )}
                        name={'mottarAnnenForelderYtelserFraUtland'}
                        className={'side-container__children__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            settSvarFelt(
                                'mottarAnnenForelderYtelserFraUtland' as Feltnavn,
                                value as Svar
                            );
                            nullstillNesteSteg();
                        }}
                        checked={mottarAnnenForelderYtelserFraUtland.verdi}
                        radios={[
                            { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                            { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        ]}
                        feil={feltMedFeil.mottarAnnenForelderYtelserFraUtland}
                    />
                )}
                {mottarAnnenForelderYtelserFraUtland.verdi === Svar.JA && (
                    <PanelBase className={'utenlandsk-ytelser__panel'}>
                        <TextareaControlled
                            label={intl.formatMessage({
                                id: 'utenlandskYtelser.forklaring.hjelpetekst',
                            })}
                            defaultValue={mottarAnnenForelderYtelserFraUtlandForklaring.verdi}
                            maxLength={500}
                            onBlur={(evt: any) => {
                                settStringFelt(
                                    'mottarAnnenForelderYtelserFraUtlandForklaring' as Feltnavn,
                                    evt.target.value
                                );
                            }}
                            feil={feltMedFeil.mottarAnnenForelderYtelserFraUtlandForklaring}
                        />
                    </PanelBase>
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        familieforhold: selectFamilieforhold(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        utenlandskYtelser: selectYtelserFraUtland(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nullstillNesteSteg: () => {
            dispatch(soknadNullstillNesteSteg());
        },
        settStringFelt: (feltnavn: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('utenlandskYtelser', feltnavn, verdi));
        },
        settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt('utenlandskYtelser', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(UtenlandskYtelser));
