import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import BarnIkon from '../../component/Ikoner/BarnIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
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
    intl,
}) => {
    const feltMedFeil = hentFeltMedFeil(valgtBarn, harForsoktNesteSteg, intl);
    return (
        <SideContainer
            className={'mine-barn'}
            ikon={<BarnIkon />}
            tittel={intl.formatMessage({ id: 'barn.tittel' })}
        >
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
