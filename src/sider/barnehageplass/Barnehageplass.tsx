import * as classNames from 'classnames';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import Barnehageikon from '../../component/Ikoner/BarnehageIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, IBarnehageplass, Svar, Feltnavn } from '../../soknad/types';
import PanelBase from 'nav-frontend-paneler';
import BarnehageplassStatus from './BarnehageplassStatus';

interface IMapDispatchToProps {
    nesteSteg: () => void;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
    settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => void;
}

interface IMapStateToProps {
    barnehageplass: IBarnehageplass;
    harForsoktNesteSteg: boolean;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    barnehageplass,
    harForsoktNesteSteg,
    intl,
    nesteSteg,
    settBarnehageplassVerdiFelt,
    settSvarFelt,
}) => {
    const { barnBarnehageplassStatus, harBarnehageplass } = barnehageplass;
    const feltMedFeil = hentFeltMedFeil(barnehageplass, harForsoktNesteSteg, intl);

    return (
        <SideContainer className={'barnehage'}>
            <div className={'barnehage__ikon'}>
                <Barnehageikon />
            </div>
            <h3 className={'typo-innholdstittel barnehage__sidetittel'}>
                {intl.formatMessage({ id: 'barnehageplass.tittel' })}
            </h3>
            <p className={classNames('typo-normal', 'barnehage__info')}>
                {intl.formatMessage({ id: 'barnehageplass.ingress' })}
            </p>

            <form>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'barnehageplass.harPlass',
                    })}
                    name={'harBarnehageplass'}
                    className={'barnehage__inputPanelGruppe'}
                    onChange={(evt: {}, value: string) => {
                        settSvarFelt('harBarnehageplass' as Feltnavn, value as Svar);
                        settBarnehageplassVerdiFelt(
                            'barnBarnehageplassStatus' as Feltnavn,
                            BarnehageplassVerdier.Ubesvart
                        );
                    }}
                    checked={harBarnehageplass.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                    ]}
                    feil={feltMedFeil.harBarnehageplass}
                />
                {harBarnehageplass.verdi !== Svar.UBESVART && (
                    <PanelBase className={'barnehage__panel'}>
                        <BarnehageplassStatus
                            barnBarnehageplassStatus={barnBarnehageplassStatus}
                            feltMedFeil={feltMedFeil}
                            harBarnehageplass={harBarnehageplass}
                            intl={intl}
                            settBarnehageplassVerdiFelt={settBarnehageplassVerdiFelt}
                        />
                    </PanelBase>
                )}
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settSvarFelt: (feltnavn: Feltnavn, verdi: Svar) => {
            dispatch(soknadValiderFelt('barnehageplass', feltnavn, verdi));
        },
        settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => {
            dispatch(soknadValiderFelt('barnehageplass', feltnavn, verdi));
        },
    };
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barnehageplass: selectBarnehageplass(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Barnehageplass));
