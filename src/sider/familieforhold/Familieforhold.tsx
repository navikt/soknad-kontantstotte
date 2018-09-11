import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { selectHarForsoktNesteSteg } from '../../app/selectors';
import { IFeltFeil } from '../../common/lib/validation/types';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SideContainer from '../../component/SideContainer/SideContainer';
import Tilbakeknapp from '../../component/Tilbakeknapp/Tilbakeknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg, soknadValiderFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar, ValideringsStatus } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    familieforhold: IFamilieforhold;
    feltMedFeil: IFeltFeil;
}

interface IMapDispatchToProps {
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IMapStateToProps & IMapDispatchToProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    familieforhold,
    feltMedFeil,
    nesteSteg,
    ...annenForelderProps
}) => {
    return (
        <SideContainer>
            <Tilbakeknapp posisjon={'oppe'} />
            <form>
                <JaNeiSporsmal
                    bolk="familieforhold"
                    felt="borForeldreneSammenMedBarnet"
                    sporsmalNokkel="familieforhold.borForeldreneSammenMedBarnet.sporsmal"
                    verdi={familieforhold.borForeldreneSammenMedBarnet.verdi as Svar}
                    hjelpetekstNokkel={'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'}
                />

                {familieforhold.borForeldreneSammenMedBarnet.verdi === Svar.JA && (
                    <AnnenForelderInfo
                        familieforhold={familieforhold}
                        feltMedFeil={feltMedFeil}
                        {...annenForelderProps}
                    />
                )}
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    const familieforhold = selectFamilieforhold(state);
    const harForsoktNesteSteg = selectHarForsoktNesteSteg(state);

    const feltMedFeil = Object.entries(familieforhold).reduce(
        (accFeltMedFeil: IFeltFeil, [key, felt]) => {
            accFeltMedFeil[key] =
                felt.valideringsStatus !== ValideringsStatus.OK && harForsoktNesteSteg
                    ? { feilmelding: felt.feilmeldingsNokkel }
                    : undefined;
            return accFeltMedFeil;
        },
        {}
    );

    return {
        familieforhold,
        feltMedFeil,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
        settAnnenForelderFodselsnummer: personnr => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: navn => {
            dispatch(soknadValiderFelt('familieforhold', 'annenForelderNavn', navn));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Familieforhold);
