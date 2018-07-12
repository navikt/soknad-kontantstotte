import { push } from 'connected-react-router';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ValidForm } from '../../common/lib/validation';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { Svar } from '../../soknad/reducer';
import AnnenForelderInfo from './AnnenForelderInfo';

interface IMapStateToProps {
    borForeldreneSammenMedBarnet: Svar;
    erAvklartDeltBosted: Svar;
}

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => any;
}

type FamilieforholdProps = IMapStateToProps & IMapDispatchToProps;

const FamilieforholdSide: React.StatelessComponent<FamilieforholdProps> = (
    {
        borForeldreneSammenMedBarnet,
        erAvklartDeltBosted,
        navigerTilPath
    }) => {

    return (
        <SideContainer>
            <ValidForm summaryTitle={'Familieforhold'} onSubmit={() => navigerTilPath('/barnehageplass')}>
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
                <SubmitKnapp label='submitknapp.neste'/>
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        borForeldreneSammenMedBarnet: state.soknad.borForeldreneSammenMedBarnet,
        erAvklartDeltBosted: state.soknad.erAvklartDeltBosted,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        navigerTilPath: (path: string) => dispatch(push(path))
    };
};

export {
    IMapStateToProps as IFamilieforhold
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilieforholdSide);
