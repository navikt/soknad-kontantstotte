import Veileder from 'nav-frontend-veileder';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import Barnehageikon from '../../component/Ikoner/Barnehage';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadSettFelt } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, IBarnehageplass, Svar } from '../../soknad/types';

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
    const radios = [
        { label: intl.formatMessage({ id: 'svar.nei' }), value: BarnehageplassVerdier.Nei },
        { label: intl.formatMessage({ id: 'svar.ja' }), value: BarnehageplassVerdier.Ja },
    ];

    return (
        <SideContainer>
            <div className={'barnehage'}>
                <Veileder center={true}>
                    <Barnehageikon />
                </Veileder>

                <h2 className={'barnehage__sidetittel'}>
                    {intl.formatMessage({ id: 'barnehageplass.tittel' })}
                </h2>
                <p className={'barnehage__info'}>
                    {intl.formatMessage({ id: 'barnehageplass.ingress' })}
                </p>
                <ValidForm summaryTitle={'Barnehageplass'} onSubmit={nesteSteg}>
                    <ValidRadioPanelGruppe
                        className={'barnehage__inputPanelGruppe'}
                        name="barnehageplass"
                        legend="Har barnet barnehageplass?"
                        radios={radios}
                        checked={T.verdi}
                        onChange={(event: {}, value: string) => {
                            settSvar(value as BarnehageplassVerdier);
                        }}
                    />
                    <Submitknapp label="app.neste" onClick={nesteSteg} />
                </ValidForm>
            </div>
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
