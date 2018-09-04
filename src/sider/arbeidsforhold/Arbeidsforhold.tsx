import { push } from 'connected-react-router';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';
import ValidForm from '../../common/lib/validation/ValidForm';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SideContainer from '../../component/SideContainer/SideContainer';
import Submitknapp from '../../component/Submitknapp/Submitknapp';
import { IRootState } from '../../rootReducer';
import { selectArbeidsforhold } from '../../soknad/selectors';
import { IArbeidsforhold, Stegnavn } from '../../soknad/types';

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
                    verdi={mottarYtelserFraUtlandet}
                    harForklaring={true}
                    forklaring={mottarYtelserFraUtlandetForklaring}
                />

                <JaNeiSporsmal
                    bolk={bolk}
                    felt="arbeiderIUtlandetEllerKontinentalsokkel"
                    sporsmalNokkel="arbeidsforhold.arbeiderIUtlandetEllerKontinentalsokkel.sporsmal"
                    verdi={arbeiderIUtlandetEllerKontinentalsokkel}
                    harForklaring={true}
                    forklaring={arbeiderIUtlandetEllerKontinentalsokkelForklaring}
                />

                <JaNeiSporsmal
                    bolk={bolk}
                    felt="mottarKontantstotteFraAnnetEOS"
                    sporsmalNokkel="arbeidsforhold.mottarKontantstotteFraAnnetEOS.sporsmal"
                    verdi={mottarKontantstotteFraAnnetEOS}
                    harForklaring={true}
                    forklaring={mottarKontantstotteFraAnnetEOSForklaring}
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
        nesteSteg: () => dispatch(appNesteSteg()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Arbeidsforhold);
