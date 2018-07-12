import * as React from 'react';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { selectArbeidsforhold } from '../../soknad/selectors';
import { Bolk, IArbeidsforhold } from '../../soknad/types';

type ArbeidsforholdSideProps = IArbeidsforhold;

const ArbeidsforholdSide: React.StatelessComponent<ArbeidsforholdSideProps> = (
    {
        mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring,
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring
    }) => {
    const bolk: Bolk = 'arbeidsforhold';
    return (
        <SideContainer>
            <JaNeiSporsmal
                bolk={ bolk }
                felt='mottarYtelserFraUtlandet'
                sporsmalNokkel='arbeidsforhold.mottarYtelserFraUtlandet.sporsmal'
                verdi={ mottarYtelserFraUtlandet }
                harForklaring={ true }
                forklaring={ mottarYtelserFraUtlandetForklaring }
            />

            <JaNeiSporsmal
                bolk={ bolk }
                felt='arbeiderIUtlandetEllerKontinentalsokkel'
                sporsmalNokkel='arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal'
                verdi={ arbeiderIUtlandetEllerKontinentalsokkel }
                harForklaring={ true }
                forklaring={ arbeiderIUtlandetEllerKontinentalsokkelForklaring }
            />

            <JaNeiSporsmal
                bolk={ bolk }
                felt='mottarKontantstotteFraAnnetEOS'
                sporsmalNokkel='arbeidsforhold.mottarKontantstotteFraAnnetEOS.sporsmal'
                verdi={ mottarKontantstotteFraAnnetEOS }
                harForklaring={ true }
                forklaring={ mottarKontantstotteFraAnnetEOSForklaring }
            />

            <NavigasjonKnapp to='/oppsummering'>Neste</NavigasjonKnapp>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return selectArbeidsforhold(state);
};

export default connect(mapStateToProps)(ArbeidsforholdSide);
