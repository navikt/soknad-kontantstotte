import { Input } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import { ValidForm, ValidGroup } from '../../common/lib/validation';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { selectBarn } from '../../person/selectors';
import { IBarn } from '../../person/types';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';

interface IMapStateToProps {
    barn: IBarn[];
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
    nesteSteg,
    settBarnFodselsdato,
    settBarnNavn,
    valgtBarn,
    velgBarn,
}) => {
    return (
        <SideContainer className={'mine-barn'}>
            <ValidForm summaryTitle={'mine-barn'} onSubmit={nesteSteg}>
                <ValidGroup
                    validators={[
                        {
                            failText: 'Du må enten velge barn eller fylle ut informasjon om barnet',
                            test: () => !!valgtBarn.fodselsdato && !!valgtBarn.navn,
                        },
                    ]}
                >
                    <RadioPanelGruppe
                        radios={barn.map(b => ({ label: b.navn, value: b.fodselsdato }))}
                        name={'barn'}
                        legend={'Velg barn du søker kontantstøtte for:'}
                        checked={valgtBarn.fodselsdato}
                        onChange={(evt: {}, value: string) => {
                            const nyttValgtBarn = barn.find(b => b.fodselsdato === value);
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
                        defaultValue={valgtBarn.navn}
                    />
                    <Input
                        className={'mine-barn__fodselsdato-input'}
                        label={'Fødselsdato'}
                        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                            settBarnFodselsdato(event.target.value)
                        }
                        defaultValue={valgtBarn.fodselsdato}
                    />
                </ValidGroup>
                <Submitknapp label={'app.neste'} />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        settBarnFodselsdato: (fodselsdato: string) =>
            dispatch(soknadSettVerdi('mineBarn', 'fodselsdato', fodselsdato)),
        settBarnNavn: (navn: string) => dispatch(soknadSettVerdi('mineBarn', 'navn', navn)),
        velgBarn: (barn: IBarn) => {
            dispatch(soknadSettVerdi('mineBarn', 'fodselsdato', barn.fodselsdato));
            dispatch(soknadSettVerdi('mineBarn', 'navn', barn.navn));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineBarn);
