import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import BarnIkon from '../../component/Ikoner/BarnIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn, minebarnFeltnavn, Svar } from '../../soknad/types';
import { selectBarn } from '../../barn/selectors';
import { IBarn } from '../../barn/types';
import { ISoker } from '../../soker/types';
import { selectSoker } from '../../soker/selectors';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';

interface IMapStateToProps {
    barn: IBarn[];
    soker: ISoker;
    harForsoktNesteSteg: boolean;
    valgtBarn: IMineBarn;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
    settBarnFodselsnummer: (fodselsnummer: string) => void;
}

interface IRadioContent {
    label: string;
    value: string;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
    soker,
    barn,
    harForsoktNesteSteg,
    settBarnFodselsdato,
    settBarnFodselsnummer,
    settBarnNavn,
    valgtBarn,
    intl,
}) => {
    const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);

    function radioBtn(label: string, value: string): IRadioContent {
        return { label, value };
    }

    const radioButtons = barn.map((b: IBarn) =>
        radioBtn(b.fulltnavn + ' (' + b.fodselsdato + ' )', b.fodselsnummer)
    );

    return (
        <SideContainer
            className={'mine-barn'}
            ikon={<BarnIkon />}
            tittel={intl.formatMessage({ id: 'barn.tittel' })}
        >
            {barn.length >= Infinity ? (
                <form>
                    <legend className={'skjema__legend'}>
                        {intl.formatMessage({ id: 'barn.subtittel' })}
                    </legend>
                    <div className={'mine-barn__sporsmal'}>
                        <Input
                            className={'mine-barn__navn-input'}
                            label={intl.formatMessage({ id: 'barn.navn' })}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                                settBarnNavn(event.target.value)
                            }
                            defaultValue={valgtBarn.navn.verdi}
                            feil={feltMedFeil.navn}
                        />
                        <Input
                            className={'mine-barn__fodselsdato-input'}
                            label={intl.formatMessage({ id: 'barn.fodselsdato' })}
                            onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                                settBarnFodselsdato(event.target.value)
                            }
                            defaultValue={valgtBarn.fodselsdato.verdi}
                            feil={feltMedFeil.fodselsdato}
                        />
                    </div>
                </form>
            ) : (
                <form>
                    <RadioPanelGruppe
                        legend={intl.formatMessage({ id: 'barn.subtittel' })}
                        name={'mine-barn__sporsmal'}
                        className={'soknad__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            let nyttValgtBarn = barn.find(b => b.fodselsnummer === value);
                            if (nyttValgtBarn == null) {
                                nyttValgtBarn = {
                                    fulltnavn: '',
                                    fodselsdato: '',
                                    fodselsnummer: '',
                                };
                            }
                            settBarnNavn(nyttValgtBarn.fulltnavn);
                            settBarnFodselsdato(nyttValgtBarn.fodselsdato);
                            settBarnFodselsnummer(nyttValgtBarn.fodselsnummer);
                        }}
                        checked={valgtBarn.fodselsnummer.verdi}
                        radios={radioButtons}
                        feil={feltMedFeil.fodselsnummer}
                    />
                </form>
            )}
        </SideContainer>
    );
};

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
        settBarnFodselsdato: (fodselsdato: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fodselsdato', fodselsdato)),
        settBarnFodselsnummer: (fodselsnummer: string) =>
            dispatch(soknadValiderFelt('mineBarn', 'fodselsnummer', fodselsnummer)),
        settBarnNavn: (navn: string) => dispatch(soknadValiderFelt('mineBarn', 'navn', navn)),
    };
};

export default injectIntl(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MineBarn)
);
