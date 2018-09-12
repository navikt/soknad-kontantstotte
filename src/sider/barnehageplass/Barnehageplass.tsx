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
import { BarnehageplassVerdier, IBarnehageplass, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nesteSteg: () => void;
    settSvar: (verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    barnehagePlass: IBarnehageplass;
    harForsoktNesteSteg: boolean;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    barnehagePlass,
    harForsoktNesteSteg,
    intl,
    nesteSteg,
    settSvar,
}) => {
    const { harBarnehageplass } = barnehagePlass;
    const feltMedFeil = hentFeltMedFeil(barnehagePlass, harForsoktNesteSteg, intl);

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
                        settSvar(value as BarnehageplassVerdier);
                    }}
                    checked={harBarnehageplass.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                    feil={feltMedFeil.harBarnehageplass}
                />
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadValiderFelt('barnehageplass', 'harBarnehageplass', verdi));
        },
    };
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barnehagePlass: selectBarnehageplass(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Barnehageplass));
