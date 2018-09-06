import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
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

interface IMapStateToProps {
    barnehageplass: IBarnehageplass;
    harForsoktNesteSteg: boolean;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    barnehageplass,
    harForsoktNesteSteg,
    settSvar,
    intl,
    settEkstraFelt,
    nesteSteg,
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
    const feltMedFeil = hentFeltMedFeil(barnehageplass, harForsoktNesteSteg, intl);

    return (
        <SideContainer>
            <form>
                <RadioPanelGruppe
                    name="barnehageplass"
                    legend="Har barnet barnehageplass?"
                    radios={radios}
                    checked={
                        BarnehageplassVerdier[
                            barnehageplass.harBarnehageplass.verdi as BarnehageplassVerdier
                        ]
                    }
                    onChange={(event: {}, value: string) => {
                        settSvar(value as BarnehageplassVerdier);
                    }}
                    feil={feltMedFeil.harBarnehageplass}
                />
                {valgSomKreverEkstraFelter.includes(barnehageplass.harBarnehageplass
                    .verdi as BarnehageplassVerdier) && (
                    <EkstraFelter
                        harBarnehageplass={barnehageplass.harBarnehageplass}
                        dato={barnehageplass.dato}
                        kommune={barnehageplass.kommune}
                        antallTimer={barnehageplass.antallTimer}
                        settFelt={settEkstraFelt}
                        intl={intl}
                    />
                )}
            </form>
            <Submitknapp label="app.neste" onClick={nesteSteg} />
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
