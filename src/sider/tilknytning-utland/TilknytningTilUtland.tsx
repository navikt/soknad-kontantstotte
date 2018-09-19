import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import TimeglassIkon from '../../component/Ikoner/TimeglassIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold, selectTilknytningTilUtland } from '../../soknad/selectors';
import {
    Feltnavn,
    IFamilieforhold,
    ITilknytningTilUtland,
    Svar,
    TilknytningTilUtlandVerdier,
} from '../../soknad/types';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    tilknytningTilUtland: ITilknytningTilUtland;
}

interface IMapDispatchToProps {
    settTilknytningTilUtlandVerdiFelt: (
        feltnavn: Feltnavn,
        verdi: TilknytningTilUtlandVerdier
    ) => void;
}

type TilknytningTilUtland = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const TilknytningTilUtland: React.StatelessComponent<TilknytningTilUtland> = ({
    intl,
    familieforhold,
    tilknytningTilUtland,
    settTilknytningTilUtlandVerdiFelt,
}) => {
    const {
        boddEllerJobbetINorgeMinstFemAar,
        annenForelderBoddEllerJobbetINorgeMinstFemAar,
    } = tilknytningTilUtland;
    return (
        <SideContainer
            tittel={intl.formatMessage({ id: 'tilknytningTilUtland.tittel' })}
            ikon={<TimeglassIkon />}
        >
            <RadioPanelGruppe
                legend={intl.formatMessage({
                    id: 'tilknytningTilUtland.boddEllerJobbetINorgeMinstFemAar.sporsmal',
                })}
                name={'boddEllerJobbetINorgeMinstFemAar'}
                className={'soknad__inputPanelGruppe'}
                onChange={(evt: {}, value: string) => {
                    settTilknytningTilUtlandVerdiFelt(
                        'boddEllerJobbetINorgeMinstFemAar' as Feltnavn,
                        value as TilknytningTilUtlandVerdier
                    );
                }}
                checked={boddEllerJobbetINorgeMinstFemAar.verdi}
                radios={[
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaINorge' }),
                        value: TilknytningTilUtlandVerdier.jaINorge,
                    },
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaIEOS' }),
                        value: TilknytningTilUtlandVerdier.jaIEOS,
                    },
                    {
                        label: intl.formatMessage({
                            id: 'tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS',
                        }),
                        value: TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS,
                    },
                    {
                        label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.nei' }),
                        value: TilknytningTilUtlandVerdier.nei,
                    },
                ]}
            />
            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id:
                            'tilknytningTilUtland.annenForelderBoddEllerJobbetINorgeMinstFemAar.sporsmal',
                    })}
                    name={'annenForelderBoddEllerJobbetINorgeMinstFemAar'}
                    className={'soknad__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settTilknytningTilUtlandVerdiFelt(
                            'annenForelderBoddEllerJobbetINorgeMinstFemAar' as Feltnavn,
                            value as TilknytningTilUtlandVerdier
                        );
                    }}
                    checked={annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi}
                    radios={[
                        {
                            label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaINorge' }),
                            value: TilknytningTilUtlandVerdier.jaINorge,
                        },
                        {
                            label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.jaIEOS' }),
                            value: TilknytningTilUtlandVerdier.jaIEOS,
                        },
                        {
                            label: intl.formatMessage({
                                id: 'tilknytningTilUtland.svar.jaLeggerSammenPerioderEOS',
                            }),
                            value: TilknytningTilUtlandVerdier.jaLeggerSammenPerioderEOS,
                        },
                        {
                            label: intl.formatMessage({ id: 'tilknytningTilUtland.svar.nei' }),
                            value: TilknytningTilUtlandVerdier.nei,
                        },
                    ]}
                />
            )}
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        familieforhold: selectFamilieforhold(state),
        tilknytningTilUtland: selectTilknytningTilUtland(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settTilknytningTilUtlandVerdiFelt: (
            feltnavn: Feltnavn,
            verdi: TilknytningTilUtlandVerdier
        ) => {
            dispatch(soknadValiderFelt('tilknytningTilUtland', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(TilknytningTilUtland));
