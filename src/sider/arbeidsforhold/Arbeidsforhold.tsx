import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import ValidForm from '../../common/lib/validation/ValidForm';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { soknadNesteSteg } from '../../soknad/actions';
import { selectArbeidsforhold } from '../../soknad/selectors';
import { IArbeidsforhold, Stegnavn, Svar } from '../../soknad/types';

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

type ArbeidsforholdSideProps = IArbeidsforhold & IMapDispatchToProps;

const Arbeidsforhold: React.StatelessComponent<ArbeidsforholdSideProps> = ({
    mottarYtelserFraUtlandet,
    mottarYtelserFraUtlandetForklaring,
    arbeiderIUtlandetEllerKontinentalsokkel,
    arbeiderIUtlandetEllerKontinentalsokkelForklaring,
    mottarKontantstotteFraAnnetEOS,
    mottarKontantstotteFraAnnetEOSForklaring,
    nesteSteg,
}) => {
    const bolk: Stegnavn = 'arbeidsforhold';
    return (
        <SideContainer>
            <ValidForm summaryTitle={'Arbeidsforhold'} onSubmit={nesteSteg}>
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
                <Submitknapp label="app.neste" onClick={nesteSteg} />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return selectArbeidsforhold(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(soknadNesteSteg()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Arbeidsforhold);
