import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import SideContainer from '../../container/SideContainer/SideContainer';
import { sendInn } from '../../innsending/actions';
import { ISoknad } from '../../innsending/soknad';
import { IRootState } from '../../rootReducer';

interface IMapDispatchToProps {
    sendSoknad: (soknad: ISoknad) => any;
}

interface IMapStateToProps {
    soknad: ISoknad;
}

type OppsummeringSideProps = IMapDispatchToProps & IMapStateToProps;

const OppsummeringSide: React.StatelessComponent<OppsummeringSideProps> = ({sendSoknad, soknad}) => {
    return (
        <SideContainer>
            <h1>Oversikt over hva du har fylt ut</h1>
            <KnappBase type={'hoved'} onClick={() => sendSoknad(soknad)}>Send inn</KnappBase>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        soknad: {
            arbeidsforhold: {
                arbeiderIUtlandetEllerKontinentalsokkel: state.soknad.arbeiderIUtlandetEllerKontinentalsokkel,
                mottarKontantstotteFraAnnetEOS: state.soknad.mottarKontantstotteFraAnnetEOS,
                mottarYtelserFraUtlandet: state.soknad.mottarYtelserFraUtlandet,
            },
            barnehageplass: {
                harBarnehageplass: state.soknad.harBarnehageplass,
            },
            familieforhold: {
                borForeldreneSammenMedBarnet: state.soknad.borForeldreneSammenMedBarnet,
                erAvklartDeltBosted: state.soknad.erAvklartDeltBosted,
            },
            sokerKrav: {
                boddINorgeSisteFemAar: state.soknad.boddINorgeSisteFemAar,
                borSammenMedBarnet: state.soknad.borSammenMedBarnet,
                skalBoMedBarnetINorgeNesteTolvMaaneder: state.soknad.skalBoMedBarnetINorgeNesteTolvMaaneder,
            }
        }
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        sendSoknad: (soknad: ISoknad) => {
            dispatch(sendInn(soknad));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OppsummeringSide);
