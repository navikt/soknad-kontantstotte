import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IFeltFeil } from '../../common/types';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt } from '../../soknad/types';

interface IBarnehageplassHarSluttetInfo {
    intl: InjectedIntl;
    brukFlertall: boolean;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    harSluttetIBarnehageAntallTimer: IFelt;
    harSluttetIBarnehageDato: IFelt;
    harSluttetIBarnehageKommune: IFelt;
}

type BarnehageplassHarSluttetInfoProps = IBarnehageplassHarSluttetInfo & IMapStateToProps;

const BarnehageplassHarSluttetInfo: React.StatelessComponent<BarnehageplassHarSluttetInfoProps> = ({
    intl,
    brukFlertall,
    feltMedFeil,
    settBarnehageplassVerdiFelt,
    harSluttetIBarnehageAntallTimer,
    harSluttetIBarnehageDato,
    harSluttetIBarnehageKommune,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? { id: 'barnehageplass.harSluttetIBarnehage.dato.sporsmal.flertall' }
                            : { id: 'barnehageplass.harSluttetIBarnehage.dato.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageDato.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageDato}
                    maxLength={10}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage(
                        brukFlertall
                            ? {
                                  id:
                                      'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal.flertall',
                              }
                            : { id: 'barnehageplass.harSluttetIBarnehage.antallTimer.sporsmal' }
                    )}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageAntallTimer.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageAntallTimer}
                    type={'tel'}
                    autoComplete={'off'}
                    maxLength={5}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harSluttetIBarnehage.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harSluttetIBarnehageKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harSluttetIBarnehageKommune.verdi}
                    feil={feltMedFeil.harSluttetIBarnehageKommune}
                    maxLength={50}
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harSluttetIBarnehageAntallTimer: selectBarnehageplass(state)
            .harSluttetIBarnehageAntallTimer,
        harSluttetIBarnehageDato: selectBarnehageplass(state).harSluttetIBarnehageDato,
        harSluttetIBarnehageKommune: selectBarnehageplass(state).harSluttetIBarnehageKommune,
    };
};

export default connect(mapStateToProps)(BarnehageplassHarSluttetInfo);
