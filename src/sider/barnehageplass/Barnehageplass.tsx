import { push } from 'connected-react-router';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Felt, IBarnehageplass } from '../../soknad/types';
import Veilederikon from '../../component/Ikoner/Veilederikon';
import Barnehageikon from '../../component/Ikoner/Barnehage';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'nav-frontend-veileder';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';

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
                        legend={intl.formatMessage({ id: 'barnehageplass.harPlass' })}
                        radios={radios}
                        checked={BarnehageplassVerdier[harBarnehageplass]}
                        validators={[
                            {
                                failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                                test: () => harBarnehageplass !== BarnehageplassVerdier.Ubesvart,
                            },
                        ]}
                        onChange={(event: {}, value: string) => {
                            settSvar(value as BarnehageplassVerdier);
                        }}
                    />
                    <Submitknapp label="app.neste" />
                </ValidForm>
            </div>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadSettVerdi('barnehageplass', 'harBarnehageplass', verdi));
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
