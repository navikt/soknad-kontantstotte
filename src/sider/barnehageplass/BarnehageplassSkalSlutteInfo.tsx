import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IFeltFeil } from '../../common/types';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt } from '../../soknad/types';

interface IBarnehageplassSkalSlutteInfo {
    intl: InjectedIntl;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    skalSlutteIBarnehageAntallTimer: IFelt;
    skalSlutteIBarnehageDato: IFelt;
    skalSlutteIBarnehageKommune: IFelt;
}

type BarnehageplassSkalSlutteInfoProps = IBarnehageplassSkalSlutteInfo & IMapStateToProps;

const BarnehageplassSkalSlutteInfo: React.StatelessComponent<BarnehageplassSkalSlutteInfoProps> = ({
    intl,
    feltMedFeil,
    settBarnehageplassVerdiFelt,
    skalSlutteIBarnehageAntallTimer,
    skalSlutteIBarnehageDato,
    skalSlutteIBarnehageKommune,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.dato.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageDato.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageDato}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.antallTimer.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageAntallTimer.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageAntallTimer}
                    type={'tel'}
                    autoComplete={'off'}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalSlutteIBarnehage.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalSlutteIBarnehageKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalSlutteIBarnehageKommune.verdi}
                    feil={feltMedFeil.skalSlutteIBarnehageKommune}
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        skalSlutteIBarnehageAntallTimer: selectBarnehageplass(state)
            .skalSlutteIBarnehageAntallTimer,
        skalSlutteIBarnehageDato: selectBarnehageplass(state).skalSlutteIBarnehageDato,
        skalSlutteIBarnehageKommune: selectBarnehageplass(state).skalSlutteIBarnehageKommune,
    };
};

export default connect(mapStateToProps)(BarnehageplassSkalSlutteInfo);
