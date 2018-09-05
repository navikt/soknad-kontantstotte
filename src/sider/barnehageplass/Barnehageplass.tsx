import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IBarnehageplass } from '../../soknad/types';
import EkstraFelter from './EkstraFelter';

interface IMapDispatchToProps {
    nesteSteg: () => void;
    settSvar: (verdi: BarnehageplassVerdier) => void;
    settEkstraFelt: (nokkel: Feltnavn, verdi: string) => void;
}

type BarnehageplassSideProps = IBarnehageplass & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    harBarnehageplass,
    settSvar,
    intl,
    settEkstraFelt,
    nesteSteg,
    dato,
    kommune,
    antallTimer,
}) => {
    const radios = [
        { label: intl.formatMessage({ id: 'svar.nei' }), value: BarnehageplassVerdier.Nei },
        {
            label: intl.formatMessage({ id: 'svar.neiHarFaattPlass' }),
            value: BarnehageplassVerdier.NeiHarFaatt,
        },
        { label: intl.formatMessage({ id: 'svar.ja' }), value: BarnehageplassVerdier.Ja },
        {
            label: intl.formatMessage({ id: 'svar.jaHarSluttet' }),
            value: BarnehageplassVerdier.JaSkalSlutte,
        },
    ];
    const valgSomKreverEkstraFelter: BarnehageplassVerdier[] = [
        BarnehageplassVerdier.Ja,
        BarnehageplassVerdier.JaSkalSlutte,
        BarnehageplassVerdier.NeiHarFaatt,
    ];

    return (
        <SideContainer>
            <ValidForm summaryTitle={'Barnehageplass'} onSubmit={nesteSteg}>
                <ValidRadioPanelGruppe
                    name="barnehageplass"
                    legend="Har barnet barnehageplass?"
                    radios={radios}
                    checked={
                        BarnehageplassVerdier[harBarnehageplass.verdi as BarnehageplassVerdier]
                    }
                    validators={[
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                            test: () => harBarnehageplass.verdi !== BarnehageplassVerdier.Ubesvart,
                        },
                    ]}
                    onChange={(event: {}, value: string) => {
                        settSvar(value as BarnehageplassVerdier);
                    }}
                />
                {valgSomKreverEkstraFelter.includes(
                    harBarnehageplass.verdi as BarnehageplassVerdier
                ) && (
                    <EkstraFelter
                        harBarnehageplass={harBarnehageplass}
                        dato={dato}
                        kommune={kommune}
                        antallTimer={antallTimer}
                        settFelt={settEkstraFelt}
                        intl={intl}
                    />
                )}
                <Submitknapp label="app.neste" onClick={nesteSteg} />
            </ValidForm>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settEkstraFelt: (nokkel: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('barnehageplass', nokkel, verdi));
        },
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadValiderFelt('barnehageplass', 'harBarnehageplass', verdi));
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
