import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeltFeil } from '../../common/lib/validation/types';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { selectBarn } from '../../person/selectors';
import { IBarn } from '../../person/types';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';
import { IFelt, ValideringsStatus } from '../../soknad/types';

interface IMapStateToProps {
    barn: IBarn[];
    feltMedFeil: IFeltFeil;
    valgtBarn: IBarn;
}

interface IMapDispatchToProps {
    velgBarn: (barn: IBarn) => void;
    nesteSteg: () => void;
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
    barn,
    feltMedFeil,
    nesteSteg,
    settBarnFodselsdato,
    settBarnNavn,
    valgtBarn,
    velgBarn,
}) => {
    return (
        <SideContainer className={'mine-barn'}>
            <form>
                <SkjemaGruppe>
                    <RadioPanelGruppe
                        radios={barn.map(b => ({
                            label: b.navn.verdi,
                            value: b.fodselsdato.verdi,
                        }))}
                        name={'barn'}
                        legend={'Velg barn du søker kontantstøtte for:'}
                        checked={valgtBarn.fodselsdato.verdi}
                        onChange={(evt: {}, value: string) => {
                            const nyttValgtBarn = barn.find(b => b.fodselsdato.verdi === value);
                            if (nyttValgtBarn) {
                                velgBarn(nyttValgtBarn);
                            }
                        }}
                    />
                    <Input
                        className={'mine-barn__navn-input'}
                        label={'Navn'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settBarnNavn(event.target.value)
                        }
                        defaultValue={valgtBarn.navn.verdi}
                        feil={feltMedFeil.navn}
                    />
                    <Input
                        className={'mine-barn__fodselsdato-input'}
                        label={'Fødselsdato'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settBarnFodselsdato(event.target.value)
                        }
                        defaultValue={valgtBarn.fodselsdato.verdi}
                        feil={feltMedFeil.fodselsdato}
                    />
                </SkjemaGruppe>
            </form>
            <Submitknapp label={'app.neste'} onClick={nesteSteg} />
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    const barn = selectBarn(state);
    const mineBarn = selectMineBarn(state);
    const harForsoktNesteSteg = selectHarForsoktNesteSteg(state);

    const feltMedFeil = Object.entries(mineBarn).reduce(
        (accFeltMedFeil: IFeltFeil, [key, felt]) => {
            accFeltMedFeil[key] =
                felt.valideringsStatus !== ValideringsStatus.OK && harForsoktNesteSteg
                    ? { feilmelding: felt.feilmeldingsNokkel }
                    : undefined;
            return accFeltMedFeil;
        },
        {}
    );

    return {
        barn,
        feltMedFeil,
        valgtBarn: mineBarn,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settBarnFodselsdato: (fodselsdato: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', fodselsdato)),
        settBarnNavn: (navn: string) => dispatch(soknadValiderFelt('mineBarn', 'navn', navn)),
        velgBarn: (barn: IBarn) => {
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', barn.fodselsdato));
            dispatch(soknadValiderFelt('mineBarn', 'navn', barn.navn));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineBarn);
