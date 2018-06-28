import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from "react-redux";
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from "../../rootReducer";
import { soknadSettVerdi } from "../../soknad/actions";
import { ekstrafelterForHarFaattPlass, ekstrafelterForJa, ekstrafelterForJaSkalSlutte } from "./Ekstrafelter";

export enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte',
    Ubesvart = 'Ubesvart'
}

interface IMapStateToProps {
    harBarnehageplass: BarnehageplassVerdier;
    harFaattPlassFraDato?: string;
    harFaattPlassKommune?: string;
    jaFraDato?: string;
    jaKommune?: string;
    jaAntallTimer?: string;
    skalSlutteDato?: string;
    skalSlutteKommune?: string;
    skalSlutteAntallTimer?: string;
}

interface IMapDispatchToProps {
    settSvar: (verdi: BarnehageplassVerdier) => any;
    settEkstraFelt: (nokkel: string, verdi: string) => any;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const BarnehageplassSide: React.StatelessComponent<BarnehageplassSideProps> = ({
                                                                                   harBarnehageplass,
                                                                                   settSvar,
                                                                                   intl,
                                                                                   settEkstraFelt,
                                                                               }) => {
    const radios = [
        {label: intl.formatMessage({id: 'svar.nei'}), value: BarnehageplassVerdier.Nei},
        {label: intl.formatMessage({id: 'svar.neiHarFaattPlass'}), value: BarnehageplassVerdier.NeiHarFaatt},
        {label: intl.formatMessage({id: 'svar.ja'}), value: BarnehageplassVerdier.Ja},
        {label: intl.formatMessage({id: 'svar.jaHarSluttet'}), value: BarnehageplassVerdier.JaSkalSlutte}
    ];
    const visRelevanteEkstraFelter = () => {
        if (harBarnehageplass === BarnehageplassVerdier.NeiHarFaatt) {
            return ekstrafelterForHarFaattPlass(settEkstraFelt, intl);
        } else if (harBarnehageplass === BarnehageplassVerdier.Ja) {
            return ekstrafelterForJa(settEkstraFelt, intl);
        } else if (harBarnehageplass === BarnehageplassVerdier.JaSkalSlutte) {
            return ekstrafelterForJaSkalSlutte(settEkstraFelt, intl);
        }
    };

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
            {visRelevanteEkstraFelter()}
            <NavigasjonKnapp to='/arbeidsforhold'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settEkstraFelt: (nokkel: string, verdi: string) => {
            dispatch(soknadSettVerdi(nokkel, verdi));
        },
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadSettVerdi('harBarnehageplass', verdi));
        }
    };
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harBarnehageplass: state.soknad.harBarnehageplass
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BarnehageplassSide));
