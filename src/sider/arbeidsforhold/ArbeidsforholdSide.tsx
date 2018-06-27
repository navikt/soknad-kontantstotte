import * as React from 'react';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import NavigasjonKnapp from '../../component/NavigasjonKnapp/NavigasjonKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';

interface IMapStateToProps {
    mottarYtelserFraUtlandet: boolean;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: boolean;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: boolean;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
}

type ArbeidsforholdSideProps = IMapStateToProps;

const ArbeidsforholdSide: React.StatelessComponent<ArbeidsforholdSideProps> = (
    {
        mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring,
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring
    }) => {
    return (
        <SideContainer>
            <JaNeiSporsmal
                nokkel='mottarYtelserFraUtlandet'
                sporsmalNokkel='arbeidsforhold.mottarYtelserFraUtlandet.sporsmal'
                verdi={ mottarYtelserFraUtlandet }
                harForklaring={ true }
                forklaring={ mottarYtelserFraUtlandetForklaring }
            />

            <JaNeiSporsmal
                nokkel='arbeiderIUtlandetEllerKontinentalsokkel'
                sporsmalNokkel='arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal'
                verdi={ arbeiderIUtlandetEllerKontinentalsokkel }
                harForklaring={ true }
                forklaring={ arbeiderIUtlandetEllerKontinentalsokkelForklaring }
            />

            <JaNeiSporsmal
                nokkel='mottarKontantstotteFraAnnetEOS'
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
    return {
        arbeiderIUtlandetEllerKontinentalsokkel: state.soknad.arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring: state.soknad.arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS: state.soknad.mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring: state.soknad.mottarKontantstotteFraAnnetEOSForklaring,
        mottarYtelserFraUtlandet: state.soknad.mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring: state.soknad.mottarYtelserFraUtlandetForklaring
    };
};

export default connect(mapStateToProps)(ArbeidsforholdSide);
