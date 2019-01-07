import { Input } from 'nav-frontend-skjema';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
    brukTpsMineBarn: boolean;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
    settBarnFlerlingStatus: (flerlingStatus: string) => void;
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
    settBarnNavn,
    settBarnFlerlingStatus,
    valgtBarn,
    intl,
    brukTpsMineBarn,
}) => {
    const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);

    function radioBtn(label: string, value: string): IRadioContent {
        return { label, value };
    }

    const radioButtons = Array.from(barn).map((b: IBarn) =>
        radioBtn(b.fulltnavn + ' (' + b.fodselsdato + ' )', b.fulltnavn)
    );

    return (
        <SideContainer
            className={'mine-barn'}
            ikon={<BarnIkon />}
            tittel={intl.formatMessage({ id: 'barn.tittel' })}
            intl={intl}
        >
            {brukTpsMineBarn ? (
                <form>
                    <RadioPanelGruppe
                        legend={intl.formatMessage({ id: 'barn.subtittel' })}
                        name={'mine-barn__sporsmal'}
                        className={'soknad__inputPanelGruppe'}
                        onChange={(evt: {}, value: string) => {
                            let nyttValgtBarn = barn.find(b => b.fulltnavn === value);
                            if (nyttValgtBarn == null) {
                                nyttValgtBarn = {
                                    erFlerling: '',
                                    fodselsdato: '',
                                    fulltnavn: '',
                                };
                            }
                            settBarnNavn(nyttValgtBarn.fulltnavn);
                            settBarnFodselsdato(nyttValgtBarn.fodselsdato);
                            settBarnFlerlingStatus(
                                JSON.parse(nyttValgtBarn.erFlerling) ? Svar.JA : Svar.NEI
                            );
                        }}
                        checked={valgtBarn.navn.verdi}
                        radios={radioButtons}
                        feil={feltMedFeil.navn}
                    />
                </form>
            ) : (
                <form>
                    {settBarnFlerlingStatus(Svar.NEI)}
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
                </form>
            )}
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        brukTpsMineBarn: isEnabled(state, IToggleName.bruk_tps_mineBarn),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        soker: selectSoker(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settBarnFlerlingStatus: (flerlingStatus: string) =>
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
