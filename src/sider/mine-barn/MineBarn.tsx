import AlertStripe from 'nav-frontend-alertstriper';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedHTMLMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { barnSettIndeksForValgtBarn } from '../../barn/actions';
import { selectBarn, selectIndeksForValgtBarn } from '../../barn/selectors';
import { IBarn } from '../../barn/types';
import { hentFeilmeldingElement, hentFeltMedFeil } from '../../common/utils';
import BarnIkon from '../../component/Ikoner/BarnIkon';
import SideContainer from '../../component/StegSide/StegSide';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn, Svar } from '../../soknad/types';

interface IRadioContent {
    label: React.ReactNode;
    value: string;
}

interface IMapStateToProps {
    barn: IBarn[];
    harForsoktNesteSteg: boolean;
    valgtBarn: IMineBarn;
    indeksForValgtBarn: string;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFødselsdato: (fødselsdato: string) => void;
    settBarnFødselsnummer: (fødselsnummer: string) => void;
    settBarnFlerlingStatus: (flerlingStatus: Svar) => void;
    settIndeksForValgtBarn: (indeks: string) => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

interface IMineBarnState {
    vanligeBarn: IRadioContent[];
    flerlinger: IRadioContent[];
}

class MineBarn extends React.Component<MineBarnSideProps, IMineBarnState> {
    constructor(props: MineBarnSideProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        function barnTilRadioButton(barn: IBarn): IRadioContent {
            return {
                label: barn.barn.map(b => {
                    return (
                        <div key={b.fulltnavn}>
                            <div className={'mine-barn__barn-navn'}>{b.fulltnavn}</div>
                            <div>{b.fødselsdato}</div>
                        </div>
                    );
                }),
                value: `${barn.index}`,
            };
        }

        const erFlerling = (b: IBarn) => b.erFlerling;

        const vanligeBarn = props.barn.filter(b => !erFlerling(b)).map(barnTilRadioButton);
        const flerlinger = props.barn.filter(erFlerling).map(barnTilRadioButton);

        this.state = {
            flerlinger,
            vanligeBarn,
        };
    }

    public render() {
        const { harForsoktNesteSteg, valgtBarn, intl } = this.props;

        const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);

        console.log(feltMedFeil);

        return (
            <SideContainer
                className={'mine-barn'}
                ikon={<BarnIkon />}
                tittel={intl.formatMessage({ id: 'barn.tittel' })}
                intl={intl}
            >
                <form className={'mine-barn__form'}>
                    <RadioPanelGruppe
                        legend={intl.formatMessage({ id: 'barn.subtittel.vanlig' })}
                        name={'mine-barn__sporsmal'}
                        onChange={this.handleChange}
                        checked={this.props.indeksForValgtBarn}
                        radios={this.state.vanligeBarn}
                        feil={hentFeilmeldingElement(feltMedFeil.fødselsdato)}
                    />

                    {this.state.flerlinger.length > 0 && (
                        <RadioPanelGruppe
                            legend={intl.formatMessage({ id: 'barn.subtittel.flerling' })}
                            name={'mine-barn__sporsmal'}
                            onChange={this.handleChange}
                            checked={this.props.indeksForValgtBarn}
                            radios={this.state.flerlinger}
                            feil={hentFeilmeldingElement(feltMedFeil.fødselsdato)}
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
        const nyttValgtBarn = this.props.barn.find(b => `${b.index}` === value);

        if (nyttValgtBarn == null) {
            return;
        }

        const joinBarnFelter = (acc: string, cur: string, index: number, arr: string[]) => {
            if (index === arr.length - 1) {
                return acc + cur;
            }
            if (index === arr.length - 2) {
                return acc + `${cur} ${this.props.intl.formatMessage({ id: 'barn.og' })} `;
            }
            return acc + `${cur}, `;
        };

        const navn = nyttValgtBarn.barn.map(b => b.fulltnavn).reduce(joinBarnFelter, '');
        const fødselsdato = nyttValgtBarn.barn.map(b => b.fødselsdato).reduce(joinBarnFelter, '');
        const fødselsnummer = nyttValgtBarn.barn
            .map(b => b.fødselsnummer)
            .reduce(joinBarnFelter, '');

        this.props.settBarnNavn(navn);
        this.props.settBarnFødselsdato(fødselsdato);
        this.props.settBarnFødselsnummer(fødselsnummer);
        this.props.settBarnFlerlingStatus(nyttValgtBarn.erFlerling ? Svar.JA : Svar.NEI);
        this.props.settIndeksForValgtBarn(value);
    }
}

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        indeksForValgtBarn: selectIndeksForValgtBarn(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBarnFlerlingStatus: (flerlingStatus: Svar) =>
            dispatch(soknadValiderFelt('mineBarn', 'erFlerling', flerlingStatus)),
        settBarnFødselsdato: (fødselsdato: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fødselsdato', fødselsdato)),
        settBarnFødselsnummer: fødselsnummer =>
            dispatch(soknadValiderFelt('mineBarn', 'fødselsnummer', fødselsnummer)),
        settBarnNavn: (navn: string) => dispatch(soknadValiderFelt('mineBarn', 'navn', navn)),
        settIndeksForValgtBarn: (indeks: string) => dispatch(barnSettIndeksForValgtBarn(indeks)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MineBarn)
);
