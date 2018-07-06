import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import JaEkstraFelter from './JaEkstraFelter';
import JaSkalSlutteEkstraFelter from './JaSkalSlutteEkstraFelter';
import NeiHarFaattEkstraFelter from './NeiHarFaattEkstraFelter';

export enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte',
    Ubesvart = 'Ubesvart'
}

interface IMapStateToProps {
    harBarnehageplass: BarnehageplassVerdier;
    neiHarFaattPlassFraDato?: string;
    neiHarFaattPlassKommune?: string;
    fraDato?: string;
    kommune?: string;
    antallTimer?: string;
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

    return (
        <SideContainer>
            <RadioPanelGruppe
                name='barnehageplass'
                legend='Har barnet barnehageplass?'
                radios={radios}
                checked={BarnehageplassVerdier[harBarnehageplass]}
                onChange={ (event: React.SyntheticEvent<EventTarget>, value: string) => {
                    settSvar(value as BarnehageplassVerdier);
                } }
            />

            {harBarnehageplass === BarnehageplassVerdier.Ja && <JaEkstraFelter settFelt={settEkstraFelt} />}
            {harBarnehageplass === BarnehageplassVerdier.NeiHarFaatt &&
            <NeiHarFaattEkstraFelter settFelt={settEkstraFelt} />}
            {harBarnehageplass === BarnehageplassVerdier.JaSkalSlutte &&
            <JaSkalSlutteEkstraFelter settFelt={settEkstraFelt} />}
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

export {
    IMapStateToProps as IBarnehageplass
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(BarnehageplassSide));
