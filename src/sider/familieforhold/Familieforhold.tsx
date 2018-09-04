import { push } from 'connected-react-router';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import { ValidForm } from '../../common/lib/validation';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadValidertFelt } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapDispatchToProps {
    settAnnenForelderNavn: (navn: string) => void;
    settAnnenForelderFodselsnummer: (personnummer: string) => void;
    nesteSteg: () => void;
}

type FamilieforholdSideProps = IFamilieforhold & IMapDispatchToProps;

const Familieforhold: React.StatelessComponent<FamilieforholdSideProps> = ({
    borForeldreneSammenMedBarnet,
    erAvklartDeltBosted,
    nesteSteg,
    ...annenForelderProps
}) => {
    return (
        <SideContainer>
            <ValidForm summaryTitle={'Familieforhold'} onSubmit={nesteSteg}>
                <JaNeiSporsmal
                    bolk="familieforhold"
                    felt="borForeldreneSammenMedBarnet"
                    sporsmalNokkel="familieforhold.borForeldreneSammenMedBarnet.sporsmal"
                    verdi={borForeldreneSammenMedBarnet}
                    hjelpetekstNokkel={'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'}
                />

                {borForeldreneSammenMedBarnet === Svar.JA && (
                    <AnnenForelderInfo {...annenForelderProps} />
                )}

                {borForeldreneSammenMedBarnet === Svar.NEI && (
                    <JaNeiSporsmal
                        bolk="familieforhold"
                        felt="erAvklartDeltBosted"
                        sporsmalNokkel="familieforhold.erAvklartDeltBosted.sporsmal"
                        verdi={erAvklartDeltBosted}
                    />
                )}
                <Submitknapp label="app.neste" onClick={nesteSteg} />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IFamilieforhold => {
    return selectFamilieforhold(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        settAnnenForelderFodselsnummer: personnr => {
            dispatch(soknadValidertFelt('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: navn => {
            dispatch(soknadValidertFelt('familieforhold', 'annenForelderNavn', navn));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Familieforhold);
