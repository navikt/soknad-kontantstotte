import { Input } from 'nav-frontend-skjema';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import BarnIkon from '../../component/Ikoner/BarnIkon';
import SideContainer from '../../component/StegSide/StegSide';
import { IRootState } from '../../rootReducer';
import { soknadValiderFelt } from '../../soknad/actions';
import { selectMineBarn } from '../../soknad/selectors';
import { IMineBarn } from '../../soknad/types';

interface IMapStateToProps {
    harForsoktNesteSteg: boolean;
    valgtBarn: IMineBarn;
}

interface IMapDispatchToProps {
    settBarnNavn: (navn: string) => void;
    settBarnFodselsdato: (fodselsdato: string) => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
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
            intl={intl}
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
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        valgtBarn: selectMineBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
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
