import { push } from 'connected-react-router';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import ValidForm from '../../common/lib/validation/ValidForm';
import JaNeiSporsmal from '../../component/JaNeiSporsmal/JaNeiSporsmal';
import SubmitKnapp from '../../component/SubmitKnapp/SubmitKnapp';
import SideContainer from '../../container/SideContainer/SideContainer';
import { IRootState } from '../../rootReducer';
import { Svar } from '../../soknad/reducer';

interface IMapStateToProps {
    mottarYtelserFraUtlandet: Svar;
    mottarYtelserFraUtlandetForklaring?: string;
    arbeiderIUtlandetEllerKontinentalsokkel: Svar;
    arbeiderIUtlandetEllerKontinentalsokkelForklaring?: string;
    mottarKontantstotteFraAnnetEOS: Svar;
    mottarKontantstotteFraAnnetEOSForklaring?: string;
}

interface IMapDispatchToProps {
    navigerTilPath: (path: string) => any;
}

type ArbeidsforholdSideProps = IMapStateToProps & IMapDispatchToProps;

const ArbeidsforholdSide: React.StatelessComponent<ArbeidsforholdSideProps> = (
    {
        mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring,
        arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring,
        navigerTilPath
    }) => {
    return (
        <SideContainer>
            <ValidForm summaryTitle={'Arbeidsforhold'} onSubmit={() => navigerTilPath('/oppsummering')}>
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
                <SubmitKnapp label='submitknapp.neste'/>
            </ValidForm>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        arbeiderIUtlandetEllerKontinentalsokkel: state.soknad.arbeiderIUtlandetEllerKontinentalsokkel,
        arbeiderIUtlandetEllerKontinentalsokkelForklaring:
            state.soknad.arbeiderIUtlandetEllerKontinentalsokkelForklaring,
        mottarKontantstotteFraAnnetEOS: state.soknad.mottarKontantstotteFraAnnetEOS,
        mottarKontantstotteFraAnnetEOSForklaring: state.soknad.mottarKontantstotteFraAnnetEOSForklaring,
        mottarYtelserFraUtlandet: state.soknad.mottarYtelserFraUtlandet,
        mottarYtelserFraUtlandetForklaring: state.soknad.mottarYtelserFraUtlandetForklaring
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        navigerTilPath: (path: string) => dispatch(push(path))
    };
};

export {
    IMapStateToProps as IArbeidsforhold
};

export default connect(mapStateToProps, mapDispatchToProps)(ArbeidsforholdSide);