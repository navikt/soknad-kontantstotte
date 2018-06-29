import * as React from 'react';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { Svar } from '../../soknad/reducer';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    borForeldreneSammenMedBarnet: Svar;
    erAvklartDeltBosted: Svar;
}

const FamilieforholdSide: React.StatelessComponent<IMapStateToProps> = (
    {
        borForeldreneSammenMedBarnet,
        erAvklartDeltBosted,
    }) => {

    return (
        <SideContainer>
            <JaNeiSporsmal
                nokkel='borForeldreneSammenMedBarnet'
                sporsmalNokkel='familieforhold.borForeldreneSammenMedBarnet.sporsmal'
                verdi={ borForeldreneSammenMedBarnet }
                hjelpetekstNokkel={'familieforhold.borForeldreneSammenMedBarnet.hjelpetekst'}
            />

            { borForeldreneSammenMedBarnet === Svar.JA &&
                <AnnenForelderInfo />
            }

            { borForeldreneSammenMedBarnet === Svar.NEI &&
                <JaNeiSporsmal
                    nokkel='erAvklartDeltBosted'
                    sporsmalNokkel='familieforhold.erAvklartDeltBosted.sporsmal'
                    verdi={ erAvklartDeltBosted }
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
