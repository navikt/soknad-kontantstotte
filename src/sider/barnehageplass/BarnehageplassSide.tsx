import { push } from 'connected-react-router';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import EkstraFelter from './EkstraFelter';

export enum BarnehageplassVerdier {
    Nei = 'Nei',
    NeiHarFaatt = 'NeiHarFaatt',
    Ja = 'Ja',
    JaSkalSlutte = 'JaSkalSlutte',
    Ubesvart = 'Ubesvart'
}

interface IMapStateToProps {
    harBarnehageplass: BarnehageplassVerdier;
}

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => any;
    settSvar: (verdi: BarnehageplassVerdier) => any;
    settEkstraFelt: (nokkel: string, verdi: string) => any;
}

type BarnehageplassSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const BarnehageplassSide: React.StatelessComponent<BarnehageplassSideProps> = ({
                                                                                   harBarnehageplass,
                                                                                   settSvar,
                                                                                   intl,
                                                                                   settEkstraFelt,
                                                                                   navigerTilPath
                                                                               }) => {
    const radios = [
        {label: intl.formatMessage({id: 'svar.nei'}), value: BarnehageplassVerdier.Nei},
        {label: intl.formatMessage({id: 'svar.neiHarFaattPlass'}), value: BarnehageplassVerdier.NeiHarFaatt},
        {label: intl.formatMessage({id: 'svar.ja'}), value: BarnehageplassVerdier.Ja},
        {label: intl.formatMessage({id: 'svar.jaHarSluttet'}), value: BarnehageplassVerdier.JaSkalSlutte}
    ];
    const valgSomKreverEkstraFelter: BarnehageplassVerdier[] =
        [BarnehageplassVerdier.Ja, BarnehageplassVerdier.JaSkalSlutte, BarnehageplassVerdier.NeiHarFaatt];

    return (
        <SideContainer>
            <ValidForm summaryTitle={'Barnehageplass'} onSubmit={() => navigerTilPath('/arbeidsforhold')}>
                <ValidRadioPanelGruppe
                    name='barnehageplass'
                    legend='Har barnet barnehageplass?'
                    radios={radios}
                    checked={BarnehageplassVerdier[harBarnehageplass]}
                    validators={[
                        {
                            failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                            test: () => harBarnehageplass !== BarnehageplassVerdier.Ubesvart
                        }
                    ]}
                    onChange={ (...args: any[]) => {
                        settSvar(args[1] as BarnehageplassVerdier);
                        }
                    }
                />
                {valgSomKreverEkstraFelter.includes(harBarnehageplass) &&
                    <EkstraFelter barnehageplassVerdi={ harBarnehageplass }/>
                }
                <SubmitKnapp label='submitknapp.neste'/>
            </ValidForm>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        navigerTilPath: (path: string) => {
            dispatch(push(path));
        },
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
