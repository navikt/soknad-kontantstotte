import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import SideContainer from '../../container/SideContainer/SideContainer';
import { sendInn } from '../../innsending/actions';

interface IMapDispatchToProps {
    sendSoknad: () => any;
}

type OppsummeringSideProps = IMapDispatchToProps;

const OppsummeringSide: React.StatelessComponent<OppsummeringSideProps> = ({sendSoknad}) => {
    return (
        <SideContainer>
            <h1>Oversikt over hva du har fylt ut</h1>
            <KnappBase type={'hoved'} onClick={sendSoknad}>Send inn</KnappBase>
        </SideContainer>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        sendSoknad: () => {
            dispatch(sendInn());
        }
    };
};

export default connect(null, mapDispatchToProps)(OppsummeringSide);
