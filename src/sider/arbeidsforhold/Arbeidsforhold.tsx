import { push } from 'connected-react-router';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import ValidForm from '../../common/lib/validation/ValidForm';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../component/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { selectArbeidsforhold } from '../../soknad/selectors';
import { Bolk, IArbeidsforhold } from '../../soknad/types';

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => void;
}

type ArbeidsforholdSideProps = IArbeidsforhold & IMapDispatchToProps;

const Arbeidsforhold: React.StatelessComponent<ArbeidsforholdSideProps> = ({
    mottarYtelserFraUtlandet,
    mottarYtelserFraUtlandetForklaring,
    arbeiderIUtlandetEllerKontinentalsokkel,
    arbeiderIUtlandetEllerKontinentalsokkelForklaring,
    mottarKontantstotteFraAnnetEOS,
    mottarKontantstotteFraAnnetEOSForklaring,
    navigerTilPath,
}) => {
    const bolk: Bolk = 'arbeidsforhold';
    return (
        <SideContainer>
            <ValidForm
                summaryTitle={'Arbeidsforhold'}
                onSubmit={() => navigerTilPath('/oppsummering')}
            >
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
                <SubmitKnapp label="app.neste" />
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return selectArbeidsforhold(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        navigerTilPath: (path: string) => dispatch(push(path)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Arbeidsforhold);
