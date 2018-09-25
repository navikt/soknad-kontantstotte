import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { hentFeltMedFeil } from '../../common/utils';
import TimeglassIkon from '../../component/Ikoner/TimeglassIkon';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadNullstillNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold, selectTilknytningTilUtland } from '../../soknad/selectors';
import {
    Feltnavn,
    IFamilieforhold,
    ITilknytningTilUtland,
    Svar,
    TilknytningTilUtlandVerdier,
} from '../../soknad/types';
import BoddEllerJobbetINorgeSporsmal from './BoddEllerJobbetINorgeSporsmal';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    tilknytningTilUtland: ITilknytningTilUtland;
    harForsoktNesteSteg: boolean;
}

interface IMapDispatchToProps {
    settTilknytningTilUtlandVerdiFelt: (
        feltnavn: Feltnavn,
        verdi: TilknytningTilUtlandVerdier
    ) => void;
    settForklaringsFelt: (feltnavn: Feltnavn, verdi: string) => void;
    nullstillNesteSteg: () => void;
}

type TilknytningTilUtland = IMapStateToProps & IMapDispatchToProps & InjectedIntlProps;

const TilknytningTilUtland: React.StatelessComponent<TilknytningTilUtland> = ({
    intl,
    familieforhold,
    harForsoktNesteSteg,
    tilknytningTilUtland,
    nullstillNesteSteg,
    settTilknytningTilUtlandVerdiFelt,
    settForklaringsFelt,
}) => {
    const {
        boddEllerJobbetINorgeMinstFemAar,
        boddEllerJobbetINorgeMinstFemAarForklaring,
        annenForelderBoddEllerJobbetINorgeMinstFemAar,
        annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring,
    } = tilknytningTilUtland;

    const feltMedFeil = hentFeltMedFeil(tilknytningTilUtland, harForsoktNesteSteg, intl);

    return (
        <SideContainer
            tittel={intl.formatMessage({ id: 'tilknytningTilUtland.tittel' })}
            ikon={<TimeglassIkon />}
            hjelpetekstNokkel={'tilknytningTilUtland.hjelpetekst'}
        >
            <BoddEllerJobbetINorgeSporsmal
                settTilknytningTilUtlandVerdiFelt={settTilknytningTilUtlandVerdiFelt}
                settForklaringsFelt={settForklaringsFelt}
                intl={intl}
                feltMedFeil={feltMedFeil.boddEllerJobbetINorgeMinstFemAar}
                feltNavn={'boddEllerJobbetINorgeMinstFemAar'}
                feltVerdi={boddEllerJobbetINorgeMinstFemAar.verdi as TilknytningTilUtlandVerdier}
                forklaringFeltVerdi={boddEllerJobbetINorgeMinstFemAarForklaring}
                forklaringFeltFeil={feltMedFeil.boddEllerJobbetINorgeMinstFemAarForklaring}
                nullstillNeste={nullstillNesteSteg}
            />
            {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                <BoddEllerJobbetINorgeSporsmal
                    settTilknytningTilUtlandVerdiFelt={settTilknytningTilUtlandVerdiFelt}
                    settForklaringsFelt={settForklaringsFelt}
                    intl={intl}
                    feltMedFeil={feltMedFeil.annenForelderBoddEllerJobbetINorgeMinstFemAar}
                    feltNavn={'annenForelderBoddEllerJobbetINorgeMinstFemAar'}
                    feltVerdi={
                        annenForelderBoddEllerJobbetINorgeMinstFemAar.verdi as TilknytningTilUtlandVerdier
                    }
                    forklaringFeltVerdi={annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring}
                    forklaringFeltFeil={
                        feltMedFeil.annenForelderBoddEllerJobbetINorgeMinstFemAarForklaring
                    }
                    nullstillNeste={nullstillNesteSteg}
                />
            )}
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        familieforhold: selectFamilieforhold(state),
        harForsoktNesteSteg: selectHarForsoktNesteSteg(state),
        tilknytningTilUtland: selectTilknytningTilUtland(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nullstillNesteSteg: () => {
            dispatch(soknadNullstillNesteSteg());
        },
        settForklaringsFelt: (feltnavn: Feltnavn, verdi: string) => {
            dispatch(soknadValiderFelt('tilknytningTilUtland', feltnavn, verdi));
        },
        settTilknytningTilUtlandVerdiFelt: (
            feltnavn: Feltnavn,
            verdi: TilknytningTilUtlandVerdier
        ) => {
            dispatch(soknadValiderFelt('tilknytningTilUtland', feltnavn, verdi));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(TilknytningTilUtland));
