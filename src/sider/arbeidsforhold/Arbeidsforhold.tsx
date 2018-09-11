import * as React from 'react';
import { connect } from 'react-redux';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SideContainer from '../../component/SideContainer/SideContainer';
import Tilbakeknapp from '../../component/Tilbakeknapp/Tilbakeknapp';
import { IRootState } from '../../rootReducer';
import { selectArbeidsforhold } from '../../soknad/selectors';
import { IArbeidsforhold, Stegnavn, Svar } from '../../soknad/types';

type ArbeidsforholdSideProps = IArbeidsforhold;

const Arbeidsforhold: React.StatelessComponent<ArbeidsforholdSideProps> = ({
    mottarYtelserFraUtlandet,
    mottarYtelserFraUtlandetForklaring,
    arbeiderIUtlandetEllerKontinentalsokkel,
    arbeiderIUtlandetEllerKontinentalsokkelForklaring,
    mottarKontantstotteFraAnnetEOS,
    mottarKontantstotteFraAnnetEOSForklaring,
}) => {
    const bolk: Stegnavn = 'arbeidsforhold';
    return (
        <SideContainer>
            <Tilbakeknapp posisjon={'oppe'} />
            <form>
                <JaNeiSporsmal
                    bolk={bolk}
                    felt="mottarYtelserFraUtlandet"
                    sporsmalNokkel="arbeidsforhold.mottarYtelserFraUtlandet.sporsmal"
                    verdi={mottarYtelserFraUtlandet.verdi as Svar}
                    harForklaring={true}
                    forklaring={mottarYtelserFraUtlandetForklaring.verdi}
                />

                <JaNeiSporsmal
                    bolk={bolk}
                    felt="arbeiderIUtlandetEllerKontinentalsokkel"
                    sporsmalNokkel="arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal"
                    verdi={arbeiderIUtlandetEllerKontinentalsokkel.verdi as Svar}
                    harForklaring={true}
                    forklaring={arbeiderIUtlandetEllerKontinentalsokkelForklaring.verdi}
                />

                <JaNeiSporsmal
                    bolk={bolk}
                    felt="mottarKontantstotteFraAnnetEOS"
                    sporsmalNokkel="arbeidsforhold.mottarKontantstotteFraAnnetEOS.sporsmal"
                    verdi={mottarKontantstotteFraAnnetEOS.verdi as Svar}
                    harForklaring={true}
                    forklaring={mottarKontantstotteFraAnnetEOSForklaring.verdi}
                />
            </form>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return selectArbeidsforhold(state);
};

export default connect(
    mapStateToProps,
    () => ({})
)(Arbeidsforhold);
