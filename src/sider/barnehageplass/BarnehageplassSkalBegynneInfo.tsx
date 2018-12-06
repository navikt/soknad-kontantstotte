import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import { IFeltFeil } from '../../common/lib/validation/types';
import { IRootState } from '../../rootReducer';
import { selectBarnehageplass } from '../../soknad/selectors';
import { BarnehageplassVerdier, Feltnavn, IFelt } from '../../soknad/types';

interface IBarnehageplassskalBegynneInfo {
    intl: InjectedIntl;
    feltMedFeil: IFeltFeil;
    settBarnehageplassVerdiFelt: (feltnavn: Feltnavn, verdi: BarnehageplassVerdier) => void;
}

interface IMapStateToProps {
    skalBegynneIBarnehageAntallTimer: IFelt;
    skalBegynneIBarnehageDato: IFelt;
    skalBegynneIBarnehageKommune: IFelt;
}

type BarnehageplassskalBegynneInfoProps = IBarnehageplassskalBegynneInfo & IMapStateToProps;

const BarnehageplassskalBegynneInfo: React.StatelessComponent<
    BarnehageplassskalBegynneInfoProps
> = ({
    intl,
    feltMedFeil,
    settBarnehageplassVerdiFelt,
    skalBegynneIBarnehageAntallTimer,
    skalBegynneIBarnehageDato,
    skalBegynneIBarnehageKommune,
}) => {
    return (
        <SkjemaGruppe className={'soknad__inputSkjemaGruppe'}>
            <div className={'inputSkjemaGruppe__inner'}>
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalBegynneIBarnehage.dato.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalBegynneIBarnehageDato' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalBegynneIBarnehageDato.verdi}
                    feil={feltMedFeil.skalBegynneIBarnehageDato}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalBegynneIBarnehage.antallTimer.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalBegynneIBarnehageAntallTimer' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalBegynneIBarnehageAntallTimer.verdi}
                    feil={feltMedFeil.skalBegynneIBarnehageAntallTimer}
                    type={'tel'}
                    autoComplete={'off'}
                />
                <Input
                    className={'inputElement'}
                    label={intl.formatMessage({
                        id: 'barnehageplass.skalBegynneIBarnehage.kommune.sporsmal',
                    })}
                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                        settBarnehageplassVerdiFelt(
                            'skalBegynneIBarnehageKommune' as Feltnavn,
                            event.target.value as BarnehageplassVerdier
                        )
                    }
                    defaultValue={skalBegynneIBarnehageKommune.verdi}
                    feil={feltMedFeil.skalBegynneIBarnehageKommune}
                />
            </div>
        </SkjemaGruppe>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        skalBegynneIBarnehageAntallTimer: selectBarnehageplass(state)
            .skalBegynneIBarnehageAntallTimer,
        skalBegynneIBarnehageDato: selectBarnehageplass(state).skalBegynneIBarnehageDato,
        skalBegynneIBarnehageKommune: selectBarnehageplass(state).skalBegynneIBarnehageKommune,
    };
};

export default connect(mapStateToProps)(BarnehageplassskalBegynneInfo);
