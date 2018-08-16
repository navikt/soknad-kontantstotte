import NavFrontendChevron from 'nav-frontend-chevron';
import { Flatknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { appForrigeSteg } from '../../app/actions';

interface IMapDispatchToProps {
    forrigeSteg: () => void;
}

const TilbakeKnapp: React.StatelessComponent<IMapDispatchToProps> = ({ forrigeSteg }) => {
    return (
        <Flatknapp className={'tilbake-knapp'} onClick={forrigeSteg}>
            <NavFrontendChevron type="venstre" className={'tilbake-knapp__ikon'} />
            Tilbake
        </Flatknapp>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        forrigeSteg: () => dispatch(appForrigeSteg()),
    };
};

export default connect(
    () => ({}),
    mapDispatchToProps
)(TilbakeKnapp);
