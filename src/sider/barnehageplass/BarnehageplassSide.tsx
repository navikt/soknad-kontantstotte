import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from "../../rootReducer";
import { soknadSettVerdi } from "../../soknad/actions";

export enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte'
}

interface IMapStateToProps {
    harBarnehageplass: BarnehageplassVerdier;
}

interface IMapDispatchToProps {
    settSvar: (verdi: BarnehageplassVerdier) => any;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps;

const BarnehageplassSide: React.StatelessComponent<BarnehageplassSideProps> = ({harBarnehageplass, settSvar}) => {
    const radios = [
        { label: 'Nei', value: BarnehageplassVerdier.Nei },
        { label: 'Nei, men har fått plass', value: BarnehageplassVerdier.NeiHarFaatt },
        { label: 'Ja', value: BarnehageplassVerdier.Ja },
        { label: 'Ja, men har sluttet', value: BarnehageplassVerdier.JaSkalSlutte }
    ];

    return (
        <SideContainer>
            <RadioPanelGruppe
                name="barnehageplass"
                legend="Har barnet barnehageplass?"
                radios={radios}
                checked={harBarnehageplass !== undefined ? BarnehageplassVerdier[harBarnehageplass] : undefined}
                onChange={ (event: React.SyntheticEvent<EventTarget>, value: string) => {
                    settSvar(value as BarnehageplassVerdier);
                } }
            />
            <NavigasjonKnapp to='/arbeidsforhold'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settSvar: (verdi) => {
            dispatch(soknadSettVerdi('harBarnehageplass', verdi));
        }
    };
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harBarnehageplass: state.soknad.harBarnehageplass
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarnehageplassSide);
