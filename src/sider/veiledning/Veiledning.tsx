import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { appNesteSteg } from '../../app/actions';

interface IMapDispatchToProps {
    nesteSteg: () => void;
}

const Veiledning: React.StatelessComponent<IMapDispatchToProps> = ({ nesteSteg }) => {
    return (
        <div>
            <h1>Veiledningsside</h1>
            <p>Info om søknad om kontantstøtte </p>
            <Hovedknapp onClick={nesteSteg}>Start søknad</Hovedknapp>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
    };
};

export default connect(
    () => ({}),
    mapDispatchToProps
)(Veiledning);
