import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeil } from '../../common/lib/validation/types';
import { hentFeltMedFeil } from '../../common/utils';
import SideContainer from '../../component/SideContainer/SideContainer';
import Veileder from '../../component/Veileder/Veileder';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectKravTilSoker } from '../../soknad/selectors';
import { Feltnavn, IKravTilSoker, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: Feltnavn, verdi: string) => void;
}

interface IMapStateToProps {
    harForsoktNesteSteg: boolean;
    kravTilSoker: IKravTilSoker;
}

type KravTilSokerProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const KravTilSoker: React.StatelessComponent<KravTilSokerProps> = ({
    harForsoktNesteSteg,
    kravTilSoker,
    intl,
    settCheckboxVerdi,
}) => {
    const feil = Object.values(hentFeltMedFeil(kravTilSoker, harForsoktNesteSteg, intl)).reduce(
        (acc: IFeil | undefined, felt: IFeil | undefined) => {
            return felt !== undefined ? felt : acc;
        },
        undefined
    );

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
            <form className={'krav'}>
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
                    onChange={(event: React.SyntheticEvent<EventTarget>, value?: string) => {
                        if (value) {
                            const target = event.nativeEvent.target as HTMLInputElement;
                            settCheckboxVerdi(
                                value as Feltnavn,
                                target.checked ? Svar.JA : Svar.UBESVART
                            );
                        }
                    }}
                    feil={feil}
                />
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        kravTilSoker: selectKravTilSoker(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settCheckboxVerdi: (feltnavn: Feltnavn, verdi) =>
            dispatch(soknadValiderFelt('kravTilSoker', feltnavn, verdi)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(KravTilSoker)
);
