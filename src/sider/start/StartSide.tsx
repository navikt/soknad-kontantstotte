import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';

interface IMapStateToProps {
    boddINorgeSisteFemAar: boolean;
    borSammenMedBarnet: boolean;
    skalBoMedBarnetINorgeNesteTolvMaaneder: boolean;
}

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: string, verdi: boolean) => any;
}

const handterCheckboxEndring = (event: React.SyntheticEvent<EventTarget>, handler: any, value?: string) =>  {
    const target = event.nativeEvent.target as HTMLInputElement;
    handler(value, target.checked);
};

type StartSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const StartSide: React.StatelessComponent<StartSideProps>  = (
    {
        boddINorgeSisteFemAar,
        borSammenMedBarnet,
        intl,
        skalBoMedBarnetINorgeNesteTolvMaaneder,
        settCheckboxVerdi
    }) => {
    const sporsmaal: string = intl.formatMessage(
        {id: 'startside.krav.sporsmal'}
    );

    return (
      <SideContainer>
          <CheckboksPanelGruppe
              legend={ sporsmaal }
              checkboxes={
                  [
                      {

                          checked: boddINorgeSisteFemAar,
                          label: intl.formatMessage(
                              { id: 'startside.krav.boddINorgeSisteFemAar' }
                          ),
                          value: 'boddINorgeSisteFemAar'
                      },
                      {
                          checked: borSammenMedBarnet,
                          label: intl.formatMessage(
                              { id: 'startside.krav.borSammenMedBarnet' }
                          ),
                          value: 'borSammenMedBarnet'
                      },
                      {
                          checked: skalBoMedBarnetINorgeNesteTolvMaaneder,
                          label: intl.formatMessage(
                              { id: 'startside.krav.skalBoMedBarnetINorgeNesteTolvMaaneder' }
                          ),
                          value: 'skalBoMedBarnetINorgeNesteTolvMaaneder'
                      },
                  ]
              }
              onChange={(event, value) => {
                  handterCheckboxEndring(event, settCheckboxVerdi, value);
                }
              }
          />
          <NavigasjonKnapp to='/mine-barn'>Neste</NavigasjonKnapp>
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
        settCheckboxVerdi: (felt, verdi) => dispatch(soknadSettVerdi(felt, verdi)),
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(StartSide));
