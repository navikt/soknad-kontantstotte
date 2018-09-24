import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IFeltFeil } from '../../common/lib/validation/types';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt, ValideringsStatus } from '../../soknad/types';

interface IHarBarnehageplassInfo {
    intl: InjectedIntl;
    feltMedFeil: IFeltFeil;
    harForsoktNesteSteg: boolean;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    harBarnehageplassAntallTimer: IFelt;
    harBarnehageplassDato: IFelt;
    harBarnehageplassKommune: IFelt;
}

type HarBarnehageplassType = IHarBarnehageplassInfo & IMapStateToProps;

const HarBarnehageplassInfo: React.StatelessComponent<HarBarnehageplassType> = ({
    feltMedFeil,
    harBarnehageplassAntallTimer,
    harBarnehageplassDato,
    harBarnehageplassKommune,
    harForsoktNesteSteg,
    intl,
    settBarnehageplassVerdiFelt,
}) => {
    return (
        <SkjemaGruppe className={'barnehage__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harBarnehageplass.dato.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harBarnehageplassDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harBarnehageplassDato.verdi}
                    feil={feltMedFeil.harBarnehageplassDato}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harBarnehageplass.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harBarnehageplassKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harBarnehageplassKommune.verdi}
                    feil={feltMedFeil.harBarnehageplassKommune}
                />
                <Input
                    className={`inputElement${harBarnehageplassAntallTimer.valideringsStatus ===
                        ValideringsStatus.ADVARSEL &&
                        harForsoktNesteSteg &&
                        '--advarsel'}`}
                    label={intl.formatMessage({
                        id: 'barnehageplass.harBarnehageplass.antallTimer.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'harBarnehageplassAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={harBarnehageplassAntallTimer.verdi}
                    feil={feltMedFeil.harBarnehageplassAntallTimer}
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        harBarnehageplassAntallTimer: selectBarnehageplass(state).harBarnehageplassAntallTimer,
        harBarnehageplassDato: selectBarnehageplass(state).harBarnehageplassDato,
        harBarnehageplassKommune: selectBarnehageplass(state).harBarnehageplassKommune,
    };
};

export default connect(mapStateToProps)(HarBarnehageplassInfo);
