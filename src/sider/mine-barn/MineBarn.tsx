import AlertStripe from 'nav-frontend-alertstriper';
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

interface IRadioContent {
    label: React.ReactNode;
    value: string;
}

interface IMapStateToProps {
    barn: IBarn[];
    soker: ISoker;
    harForsoktNesteSteg: boolean;
    valgtBarn: IMineBarn;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
    settBarnFlerlingStatus: (flerlingStatus: Svar) => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

interface IMineBarnState {
    vanligeBarn: IRadioContent[];
    flerlinger: IRadioContent[];
    selected: string;
}

class MineBarn extends React.Component<MineBarnSideProps, IMineBarnState> {
    constructor(props: MineBarnSideProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        function barnTilRadioButton(b: IBarn): IRadioContent {
            return {
                label: (
                    <div>
                        <div className={'mine-barn__barn-navn'}>{b.fulltnavn}</div>
                        <div>{b.fodselsdato}</div>
                    </div>
                ),
                value: b.index,
            };
        }

        function erFlerling(b: IBarn) {
            return b.erFlerling;
        }

        const vanligeBarn = props.barn.filter(b => !erFlerling(b)).map(barnTilRadioButton);
        const flerlinger = props.barn.filter(erFlerling).map(barnTilRadioButton);

        const selected = props.barn.findIndex(
            (barn: IBarn) => barn.fulltnavn === props.valgtBarn.navn.verdi
        );

        this.state = {
            flerlinger,
            selected: `${selected}`,
            vanligeBarn,
        };
    }

    public render() {
        const { harForsoktNesteSteg, valgtBarn, intl } = this.props;

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
                        legend={intl.formatMessage({ id: 'barn.subtittel.vanlig' })}
                        name={'mine-barn__sporsmal'}
                        onChange={this.handleChange}
                        checked={this.state.selected}
                        radios={this.state.vanligeBarn}
                        feil={feltMedFeil.fodselsdato}
                    />

                    {this.state.flerlinger.length > 0 && (
                        <RadioPanelGruppe
                            legend={intl.formatMessage({ id: 'barn.subtittel.flerling' })}
                            name={'mine-barn__sporsmal'}
                            onChange={this.handleChange}
                            checked={this.state.selected}
                            radios={this.state.flerlinger}
                            feil={feltMedFeil.fodselsdato}
                        />
                    )}
                </form>

                {valgtBarn.erFlerling.verdi === Svar.JA && (
                    <AlertStripe className="mine-barn__advarsel" type="advarsel">
                        <FormattedHTMLMessage id={'advarsel.flerebarn.medlink'} />
                    </AlertStripe>
                )}
            </SideContainer>
        );
    }

    private handleChange(evt: {}, value: string) {
        this.setState({
            selected: value,
        });

        const nyttValgtBarn = this.props.barn.find(b => b.index === value);
        if (nyttValgtBarn == null) {
            return;
        }
        this.props.settBarnNavn(nyttValgtBarn.fulltnavn);
        this.props.settBarnFodselsdato(nyttValgtBarn.fodselsdato);
        this.props.settBarnFlerlingStatus(nyttValgtBarn.erFlerling ? Svar.JA : Svar.NEI);
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soker: selectSoker(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
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
