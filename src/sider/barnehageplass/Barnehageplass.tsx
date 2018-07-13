import { push } from 'connected-react-router';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { ValidForm, ValidRadioPanelGruppe } from '../../common/lib/validation';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Felt, IBarnehageplass } from '../../soknad/types';
import EkstraFelter from './EkstraFelter';

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => any;
    settSvar: (verdi: BarnehageplassVerdier) => any;
    settEkstraFelt: (nokkel: Felt, verdi: string) => any;
}

type BarnehageplassSideProps = IBarnehageplass & IMapDispatchToProps & InjectedIntlProps;

const Barnehageplass: React.StatelessComponent<BarnehageplassSideProps> = ({
    harBarnehageplass,
    settSvar,
    intl,
    settEkstraFelt,
    navigerTilPath,
    dato,
    kommune,
    antallTimer,
}) => {
    const radios = [
        {label: intl.formatMessage({id: 'svar.nei'}), value: BarnehageplassVerdier.Nei},
        {label: intl.formatMessage({id: 'svar.neiHarFaattPlass'}), value: BarnehageplassVerdier.NeiHarFaatt},
        {label: intl.formatMessage({id: 'svar.ja'}), value: BarnehageplassVerdier.Ja},
        {label: intl.formatMessage({id: 'svar.jaHarSluttet'}), value: BarnehageplassVerdier.JaSkalSlutte}
    ];
    const valgSomKreverEkstraFelter: BarnehageplassVerdier[] = [
        BarnehageplassVerdier.Ja,
        BarnehageplassVerdier.JaSkalSlutte,
        BarnehageplassVerdier.NeiHarFaatt,
    ];

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
                    onChange={ (event: any, value: string) => {
                        settSvar(value as BarnehageplassVerdier);
                    }}
                />
                {valgSomKreverEkstraFelter.includes(harBarnehageplass) &&
                    <EkstraFelter
                        harBarnehageplass={ harBarnehageplass }
                        dato={ dato }
                        kommune={ kommune }
                        antallTimer={ antallTimer }
                        settFelt={ settEkstraFelt }
                        intl={ intl }
                    />
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
        settEkstraFelt: (nokkel: Felt, verdi: string) => {
            dispatch(soknadSettVerdi('barnehageplass', nokkel, verdi));
        },
        settSvar: (verdi: BarnehageplassVerdier) => {
            dispatch(soknadSettVerdi('barnehageplass', 'harBarnehageplass', verdi));
        }
    };
};

const mapStateToProps = (state: IRootState): IBarnehageplass => {
    return selectBarnehageplass(state);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Barnehageplass));
