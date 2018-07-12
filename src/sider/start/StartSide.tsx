import { push } from 'connected-react-router';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ValidCheckboxPanelGruppe from '../../common/lib/validation/ValidCheckboxPanelGruppe';
import ValidForm from '../../common/lib/validation/ValidForm';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { Svar } from '../../soknad/reducer';
import { harHuketAvPaCheckbox } from '../../validators';

interface IMapStateToProps {
    boddINorgeSisteFemAar: Svar;
    borSammenMedBarnet: Svar;
    skalBoMedBarnetINorgeNesteTolvMaaneder: Svar;
}

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => any;
    settCheckboxVerdi: (felt: string, verdi: string) => any;
}

const handterCheckboxEndring = (event: React.SyntheticEvent<EventTarget>, handler: any, value?: string) =>  {
    const target = event.nativeEvent.target as HTMLInputElement;
    handler(value, target.checked ? Svar.JA : Svar.UBESVART);
};

type StartSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const StartSide: React.StatelessComponent<StartSideProps>  = (
    {
        boddINorgeSisteFemAar,
        borSammenMedBarnet,
        intl,
        skalBoMedBarnetINorgeNesteTolvMaaneder,
        settCheckboxVerdi,
        navigerTilPath
    }) => {
    const sporsmaal: string = intl.formatMessage(
        {id: 'startside.krav.sporsmal'}
    );

    return (
      <SideContainer>
          <ValidForm summaryTitle={'Søknad om kontantstøtte'} onSubmit={() => navigerTilPath('/mine-barn')}>
          <ValidCheckboxPanelGruppe
              legend={ sporsmaal }
              checkboxes={
                  [
                      {

                          checked: boddINorgeSisteFemAar === Svar.JA,
                          label: intl.formatMessage(
                              { id: 'startside.krav.boddINorgeSisteFemAar' }
                          ),
                          value: 'boddINorgeSisteFemAar'
                      },
                      {
                          checked: borSammenMedBarnet === Svar.JA,
                          label: intl.formatMessage(
                              { id: 'startside.krav.borSammenMedBarnet' }
                          ),
                          value: 'borSammenMedBarnet'
                      },
                      {
                          checked: skalBoMedBarnetINorgeNesteTolvMaaneder === Svar.JA,
                          label: intl.formatMessage(
                              { id: 'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder' }
                          ),
                          value: 'skalBoMedBarnetINorgeNesteTolvMaaneder'
                      },
                  ]
              }
              onChange={(event: any, value: any) => {
                  handterCheckboxEndring(event, settCheckboxVerdi, value);
                }
              }
              validators={[
                  {
                      failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                      test: () => harHuketAvPaCheckbox(boddINorgeSisteFemAar)
                  },
                  {
                      failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                      test: () => harHuketAvPaCheckbox(borSammenMedBarnet)
                  },
                  {
                      failText: intl.formatMessage({ id: 'svar.feilmeldingCheckbox' }),
                      test: () => harHuketAvPaCheckbox(skalBoMedBarnetINorgeNesteTolvMaaneder)
                  },
              ]}
          />
          <SubmitKnapp label='submitknapp.neste'/>
          </ValidForm>
      </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        boddINorgeSisteFemAar: state.soknad.boddINorgeSisteFemAar,
        borSammenMedBarnet: state.soknad.borSammenMedBarnet,
        skalBoMedBarnetINorgeNesteTolvMaaneder: state.soknad.skalBoMedBarnetINorgeNesteTolvMaaneder
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        navigerTilPath: (path: string) => {
            dispatch(push(path));
        },
        settCheckboxVerdi: (felt, verdi) => dispatch(soknadSettVerdi(felt, verdi)),
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(StartSide));
