import AlertStripe from 'nav-frontend-alertstriper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { selectBarn } from '../../barn/selectors';
import { IBarn } from '../../barn/types';
import { hentFeltMedFeil } from '../../common/utils';
import BarnIkon from '../../component/Ikoner/BarnIkon';
import SideContainer from '../../component/StegSide/StegSide';
import { IRootState } from '../../rootReducer';
import { selectSoker } from '../../soker/selectors';
import { ISoker } from '../../soker/types';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn, Svar } from '../../soknad/types';
import { isEnabled } from '../../toggles/selectors';
import { IToggleName } from '../../toggles/types';

interface IMapStateToProps {
    barn: IBarn[];
    soker: ISoker;
    harForsoktNesteSteg: boolean;
    valgtBarn: IMineBarn;
    brukLeggTilBarn: boolean;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
    settBarnFlerlingStatus: (flerlingStatus: Svar) => void;
    settBarnBrukerOpprettet: (brukerOpprettetStatus: Svar) => void;
}

interface IRadioContent {
    label: string;
    value: string;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

interface IMineBarnState {
    radioButtons: IRadioContent[];
    selected: string;
}

class MineBarn extends React.Component<MineBarnSideProps, IMineBarnState> {
    constructor(props: MineBarnSideProps) {
        super(props);

        function radioBtn(label: string, value: string): IRadioContent {
            return {
                label,
                value,
            };
        }

        const radioButtons = Array.from(props.barn).map((b: IBarn, index) =>
            radioBtn(b.fulltnavn + ' (' + b.fodselsdato + ' )', `${index}`)
        );

        if (props.brukLeggTilBarn) {
            radioButtons.push({
                label: 'Legg til',
                value: `${props.barn.length}`,
            });
        }

        let selected = props.barn.findIndex(
            (barn: IBarn) => barn.fulltnavn === props.valgtBarn.navn.verdi
        );
        if (selected === -1) {
            selected =
                props.valgtBarn.erBrukerOpprettet.verdi === Svar.JA ? props.barn.length : selected;
        }

        this.state = {
            radioButtons,
            selected: `${selected}`,
        };
    }

    public render() {
        const {
            soker,
            barn,
            harForsoktNesteSteg,
            settBarnBrukerOpprettet,
            settBarnFodselsdato,
            settBarnNavn,
            settBarnFlerlingStatus,
            valgtBarn,
            intl,
            brukLeggTilBarn,
        } = this.props;

        const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);

        return (
            <SideContainer
                className={'mine-barn'}
                ikon={<BarnIkon />}
                tittel={intl.formatMessage({ id: 'barn.tittel' })}
                intl={intl}
            >
                <form>
                    <RadioPanelGruppe
                        legend={intl.formatMessage({ id: 'barn.subtittel' })}
                        name={'mine-barn__sporsmal'}
                        className={'soknad__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            this.setState({
                                selected: value,
                            });

                            if (value === `${barn.length}`) {
                                settBarnNavn('');
                                settBarnFodselsdato('');
                                settBarnBrukerOpprettet(Svar.JA);
                                settBarnFlerlingStatus(Svar.NEI);
                                return;
                            }

                            let nyttValgtBarn = barn[parseInt(value, 10)];
                            if (nyttValgtBarn == null) {
                                nyttValgtBarn = {
                                    erFlerling: '',
                                    fodselsdato: '',
                                    fulltnavn: '',
                                };
                            }
                            settBarnNavn(nyttValgtBarn.fulltnavn);
                            settBarnFodselsdato(nyttValgtBarn.fodselsdato);
                            settBarnFlerlingStatus(nyttValgtBarn.erFlerling ? Svar.JA : Svar.NEI);
                            settBarnBrukerOpprettet(Svar.NEI);
                        }}
                        checked={this.state.selected}
                        radios={this.state.radioButtons}
                        feil={feltMedFeil.navn}
                    />
                    {brukLeggTilBarn && valgtBarn.erBrukerOpprettet.verdi === Svar.JA && (
                        <SkjemaGruppe>
                            <legend className={'skjema__legend'}>
                                {intl.formatMessage({ id: 'barn.subtittel' })}
                            </legend>
                            <div className={'mine-barn__sporsmal'}>
                                <Input
                                    className={'mine-barn__navn-input'}
                                    label={intl.formatMessage({ id: 'barn.navn' })}
                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        settBarnNavn(event.target.value);
                                    }}
                                    defaultValue={valgtBarn.navn.verdi}
                                    feil={feltMedFeil.navn}
                                    maxLength={50}
                                />
                                <Input
                                    className={'mine-barn__fodselsdato-input'}
                                    label={intl.formatMessage({ id: 'barn.fodselsdato' })}
                                    onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        settBarnFodselsdato(event.target.value)
                                    }
                                    defaultValue={valgtBarn.fodselsdato.verdi}
                                    feil={feltMedFeil.fodselsdato}
                                    maxLength={10}
                                />
                            </div>
                        </SkjemaGruppe>
                    )}
                </form>

                {valgtBarn.erFlerling.verdi === Svar.JA && (
                    <AlertStripe className="mine-barn__advarsel" type="info">
                        <FormattedHTMLMessage id={'advarsel.flerebarn.medlink'} />
                    </AlertStripe>
                )}
            </SideContainer>
        );
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        brukLeggTilBarn: isEnabled(state, IToggleName.legg_til_barn),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soker: selectSoker(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBarnBrukerOpprettet: (brukerOpprettetStatus: Svar) =>
            dispatch(soknadValiderFelt('mineBarn', 'erBrukerOpprettet', brukerOpprettetStatus)),
        settBarnFlerlingStatus: (flerlingStatus: Svar) =>
            dispatch(soknadValiderFelt('mineBarn', 'erFlerling', flerlingStatus)),
        settBarnFodselsdato: (fodselsdato: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', fodselsdato)),
        settBarnNavn: (navn: string) => dispatch(soknadValiderFelt('mineBarn', 'navn', navn)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MineBarn)
);
