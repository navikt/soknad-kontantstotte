import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import Barnehageikon from '../../component/Ikoner/BarnehageIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadSettFelt } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, IBarnehageplass, IFelt, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nesteSteg: () => void;
    settSvar: (verdi: BarnehageplassVerdier) => void;
}

type BarnehageplassSideProps = IBarnehageplass & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    harBarnehageplass,
    settSvar,
    intl,
    nesteSteg,
}) => {
    return (
        <SideContainer className={'barnehage'}>
            <div className={'barnehage__ikon'}>
                <Barnehageikon />
            </div>

            <form className={'barnehage__form'}>
                <h3 className={'typo-innholdstittel barnehage__sidetittel'}>
                    {intl.formatMessage({ id: 'barnehageplass.tittel' })}
                </h3>
                <p className={'typo-normal barnehage__info'}>
                    {intl.formatMessage({ id: 'barnehageplass.ingress' })}
                </p>
                <RadioPanelGruppe
                    legend={intl.formatMessage({
                        id: 'barnehageplass.harPlass',
                    })}
                    name={'harBarnehageplass'}
                    className={'barnehage__sporsmaal'}
                    onChange={(evt: {}, value: string) => {
                        settSvar(value as BarnehageplassVerdier);
                    }}
                    checked={harBarnehageplass.verdi}
                    radios={[
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI },
                    ]}
                />
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadSettFelt('barnehageplass', 'harBarnehageplass', verdi));
        },
    };
};

const mapStateToProps = (state: IRootState): IBarnehageplass => {
    return selectBarnehageplass(state);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Barnehageplass));
