import { Input } from "nav-frontend-skjema";
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { connect, Dispatch } from "react-redux";
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from "../../rootReducer";
import { soknadSettVerdi } from "../../soknad/actions";
import DatoFelt from "./DatoFelt";

export enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte'
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

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps;

const BarnehageplassSide: React.StatelessComponent<BarnehageplassSideProps> = ({
                                                                                   harBarnehageplass,
                                                                                   settSvar,
                                                                                   settEkstraFelt
}) => {
    const radios = [
        { label: 'Nei', value: BarnehageplassVerdier.Nei },
        { label: 'Nei, men har fått plass', value: BarnehageplassVerdier.NeiHarFaatt },
        { label: 'Ja', value: BarnehageplassVerdier.Ja },
        { label: 'Ja, men har nylig sluttet', value: BarnehageplassVerdier.JaSkalSlutte }
    ];
    const visRelevanteEkstraFelter = () => {
        if (harBarnehageplass === BarnehageplassVerdier.NeiHarFaatt) {
            return (
                <div>
                    <DatoFelt
                        nokkel={'Hvilken dato har barnet fått barnehageplass fra?'}
                        settDato={(dato) => settEkstraFelt('harFaattPlassFraDato', dato.toDateString())}
                    />
                    <Input
                        label={'Hvilken kommune ligger barnehagen i?'}
                        bredde={'M'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settEkstraFelt('harFaattPlassKommune', event.target.value)}
                    />
                </div>
            );
        } else if (harBarnehageplass === BarnehageplassVerdier.Ja) {
            return (
                <div>
                    <DatoFelt
                        nokkel={'Hvilken dato begynte barnet i barnehagen?'}
                        settDato={(dato) => settEkstraFelt('jaFraDato', dato.toDateString())}
                    />
                    <Input
                        label={'Hvilken kommune ligger barnehagen i?'}
                        bredde={'M'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settEkstraFelt('jaKommune', event.target.value)}
                    />
                    <Input
                        label={'Hvor mange timer i uken går barnet i barnehage?'}
                        bredde={'M'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settEkstraFelt('jaAntallTimer', event.target.value)}
                    />
                </div>
            );
        } else if (harBarnehageplass === BarnehageplassVerdier.JaSkalSlutte) {
            return (
                <div>
                    <DatoFelt
                        nokkel={'Hvilken dato slutter barnet i barnehagen?'}
                        settDato={(dato) => settEkstraFelt('skalSlutteDato', dato.toDateString())}
                    />
                    <Input
                        label={'Hvilken kommune ligger barnehagen i?'}
                        bredde={'M'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settEkstraFelt('skalSlutteKommune', event.target.value)}
                    />
                    <Input
                        label={'Hvor mange timer i uken har barnet gått i barnehage?'}
                        bredde={'M'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settEkstraFelt('skalSlutteAntallTimer', event.target.value)}
                    />
                </div>
            );
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
        settEkstraFelt: (nokkel, verdi) => {
            dispatch(soknadSettVerdi(nokkel, verdi));
        },
        settSvar: (verdi) => {
            dispatch(soknadSettVerdi('harBarnehageplass', verdi));
        }
    };
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harBarnehageplass: state.soknad.harBarnehageplass,
        harFaattPlassFraDato: '',
        harFaattPlassKommune: ''
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarnehageplassSide);
