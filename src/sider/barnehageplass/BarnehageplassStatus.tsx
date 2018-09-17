import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFeltFeil } from '../../common/lib/validation/types';
import { BarnehageplassVerdier, Feltnavn, IFelt, Svar } from '../../soknad/types';

interface IBarnehageplassStatus {
    intl: InjectedIntl;
    barnBarnehageplassStatus: IFelt;
    harBarnehageplass: IFelt;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

type BarnehageplassStatusProps = IBarnehageplassStatus;

const BarnehageplassStatus: React.StatelessComponent<BarnehageplassStatusProps> = ({
    barnBarnehageplassStatus,
    feltMedFeil,
    harBarnehageplass,
    intl,
    settBarnehageplassVerdiFelt,
}) => {
    return (
        <RadioPanelGruppe
            legend={intl.formatMessage({
                id: 'barnehageplass.barnBarnehageplassStatus',
            })}
            name={'barnBarnehageplassStatus'}
            onChange={(evt: {}, value: string) => {
                settBarnehageplassVerdiFelt(
                    'barnBarnehageplassStatus' as Feltnavn,
                    value as BarnehageplassVerdier
                );
            }}
            checked={barnBarnehageplassStatus.verdi}
            radios={
                harBarnehageplass.verdi === Svar.NEI
                    ? [
                          {
                              label: intl.formatMessage({
                                  id: 'barnehageplass.garIkkeIBarnehage',
                              }),
                              value: BarnehageplassVerdier.garIkkeIBarnehage,
                          },
                          {
                              label: intl.formatMessage({
                                  id: 'barnehageplass.harSluttetIBarnehage',
                              }),
                              value: BarnehageplassVerdier.harSluttetIBarnehage,
                          },
                      ]
                    : [
                          {
                              label: intl.formatMessage({
                                  id: 'barnehageplass.harBarnehageplass',
                              }),
                              value: BarnehageplassVerdier.harBarnehageplass,
                          },
                          {
                              label: intl.formatMessage({
                                  id: 'barnehageplass.skalBegynneIBarnehage',
                              }),
                              value: BarnehageplassVerdier.skalBegynneIBarnehage,
                          },
                          {
                              label: intl.formatMessage({
                                  id: 'barnehageplass.skalSlutteIBarnehage',
                              }),
                              value: BarnehageplassVerdier.skalSlutteIBarnehage,
                          },
                      ]
            }
            feil={feltMedFeil.barnBarnehageplassStatus}
        />
    );
};

export default BarnehageplassStatus;
