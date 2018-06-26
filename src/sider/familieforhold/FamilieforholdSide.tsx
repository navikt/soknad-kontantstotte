import * as React from 'react';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    borForeldreneSammenMedBarnet: boolean;
    erAvklartDeltBosted?: boolean;
}

const FamilieforholdSide: React.StatelessComponent<IMapStateToProps> = (
    {
        borForeldreneSammenMedBarnet,
        erAvklartDeltBosted,
    }) => {

    return (
        <SideContainer>
            <h1>Bor begge foreldrene med barnet?</h1>

            <JaNeiSporsmal
                nokkel='borForeldreneSammenMedBarnet'
                sporsmalNokkel='familieforhold.borForeldreneSammenMedBarnet.sporsmal'
                verdi={ borForeldreneSammenMedBarnet }
                hjelpetekstNokkel={'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'}
            />

            { borForeldreneSammenMedBarnet === true &&
                <AnnenForelderInfo />
            }

            { borForeldreneSammenMedBarnet === false &&
                <JaNeiSporsmal
                    nokkel='erAvklartDeltBosted'
                    sporsmalNokkel='familieforhold.erAvklartDeltBosted.sporsmal'
                    verdi={erAvklartDeltBosted}
                />
            }

            <NavigasjonKnapp to='/barnehageplass'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        borForeldreneSammenMedBarnet: state.soknad.borForeldreneSammenMedBarnet,
        erAvklartDeltBosted: state.soknad.erAvklartDeltBosted,
    };
};

export default connect(mapStateToProps)(FamilieforholdSide);
