import CheckboksPanelGruppe from 'nav-frontend-skjema/lib/checkboks-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectKravTilSoker } from '../../soknad/selectors';
import { IKravTilSoker, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    settCheckboxVerdi: (felt: string, verdi: string) => any;
}

const handterCheckboxEndring = (event: React.SyntheticEvent<EventTarget>, handler: any, value?: string) =>  {
    const target = event.nativeEvent.target as HTMLInputElement;
    handler(value, target.checked ? Svar.JA : Svar.UBESVART);
};

type KravTilSokerProps = IKravTilSoker & IMapDispatchToProps & InjectedIntlProps;

const KravTilSoker: React.StatelessComponent<KravTilSokerProps>  = (
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

                          checked: boddINorgeSisteFemAar === Svar.JA,
                          label: intl.formatMessage(
                              { id: 'startside.krav.boddINorgeSisteFemAar' }
                          ),
                          value: 'kravTilSoker.boddINorgeSisteFemAar'
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
              onChange={(event, value) => {
                  handterCheckboxEndring(event, settCheckboxVerdi, value);
                }
              }
          />
          <NavigasjonKnapp to='/mine-barn'>Neste</NavigasjonKnapp>
      </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IKravTilSoker => {
    return selectKravTilSoker(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settCheckboxVerdi: (felt, verdi) => dispatch(soknadSettVerdi(felt, verdi)),
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(KravTilSoker));
