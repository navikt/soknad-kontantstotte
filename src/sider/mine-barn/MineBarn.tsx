import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import SideContainer from '../../component/SideContainer/SideContainer';
import Tilbakeknapp from '../../component/Tilbakeknapp/Tilbakeknapp';
import { selectBarn } from '../../person/selectors';
import { IBarn } from '../../person/types';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';

interface IMapStateToProps {
    barn: IBarn[];
    harForsoktNesteSteg: boolean;
    valgtBarn: IBarn;
}

interface IMapDispatchToProps {
    velgBarn: (barn: IBarn) => void;
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
    barn,
    harForsoktNesteSteg,
    settBarnFodselsdato,
    settBarnNavn,
    valgtBarn,
    velgBarn,
    intl,
}) => {
    const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);
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
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBarnFodselsdato: (fodselsdato: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', fodselsdato)),
        settBarnNavn: (navn: string) => dispatch(soknadValiderFelt('mineBarn', 'navn', navn)),
        velgBarn: (barn: IBarn) => {
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', barn.fodselsdato));
            dispatch(soknadValiderFelt('mineBarn', 'navn', barn.navn));
        },
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MineBarn)
);
