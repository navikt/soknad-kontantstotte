import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectFamilieforhold } from '../../soknad/selectors';
import { IFamilieforhold, Svar } from '../../soknad/types';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapDispatchToProps {
    settAnnenForelderNavn: (navn: string) => any;
    settAnnenForelderFodselsnummer: (personnummer: string) => any;
}

type FamilieforholdSideProps = IFamilieforhold & IMapDispatchToProps;

const FamilieforholdSide: React.StatelessComponent<FamilieforholdSideProps> = (
    {
        borForeldreneSammenMedBarnet,
        erAvklartDeltBosted,
        ...annenForelderProps
    }) => {

    return (
        <SideContainer>
            <JaNeiSporsmal
                bolk='familieforhold'
                felt='borForeldreneSammenMedBarnet'
                sporsmalNokkel='familieforhold.borForeldreneSammenMedBarnet.sporsmal'
                verdi={borForeldreneSammenMedBarnet}
                hjelpetekstNokkel={'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'}
            />

            {borForeldreneSammenMedBarnet === Svar.JA &&
            <AnnenForelderInfo
                {...annenForelderProps}
            />
            }

            {borForeldreneSammenMedBarnet === Svar.NEI &&
            <JaNeiSporsmal
                bolk='familieforhold'
                felt='erAvklartDeltBosted'
                sporsmalNokkel='familieforhold.erAvklartDeltBosted.sporsmal'
                verdi={erAvklartDeltBosted}
            />
            }

            <NavigasjonKnapp to='/barnehageplass'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IFamilieforhold => {
    return selectFamilieforhold(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settAnnenForelderFodselsnummer: (personnr) => {
            dispatch(soknadSettVerdi('familieforhold', 'annenForelderFodselsnummer', personnr));
        },
        settAnnenForelderNavn: (navn) => {
            dispatch(soknadSettVerdi('familieforhold', 'annenForelderNavn', navn));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilieforholdSide);
