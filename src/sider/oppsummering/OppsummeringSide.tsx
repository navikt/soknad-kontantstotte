import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import SideContainer from '../../component/SideContainer/SideContainer';
import { sendInn } from '../../innsending/actions';
import { IRootState } from '../../rootReducer';
import { selectSoknad } from '../../soknad/selectors';
import { ISoknadState } from '../../soknad/types';

interface IMapDispatchToProps {
    sendSoknad: () => any;
}

interface IMapStateToProps {
    soknad: ISoknadState;
}

type OppsummeringSideProps = IMapDispatchToProps & IMapStateToProps;

const OppsummeringSide: React.StatelessComponent<OppsummeringSideProps> = ({sendSoknad}) => {
    return (
        <SideContainer>
            <h1>Oversikt over hva du har fylt ut</h1>
            <KnappBase type={'hoved'} onClick={sendSoknad}>Send inn</KnappBase>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): ISoknadState => {
    return selectSoknad(state);
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        sendSoknad: () => {
            dispatch(sendInn());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OppsummeringSide);
