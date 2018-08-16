import { Hovedknapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { appNesteSteg } from '../../app/actions';
import SideContainer from '../../component/SideContainer/SideContainer';
import { selectBarn } from '../../person/selectors';
import { IBarn } from '../../person/types';
import { IRootState } from '../../rootReducer';
import { soknadSettVerdi } from '../../soknad/actions';
import { selectValgtBarn } from '../../soknad/selectors';
import Barn from './Barn';

interface IMapStateToProps {
    barn: IBarn[];
    valgtBarn: IBarn;
}

interface IMapDispatchToProps {
    velgBarn: (barn: IBarn) => void;
    nesteSteg: () => void;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps;

const MineBarn: React.StatelessComponent<MineBarnSideProps> = ({
    barn,
    valgtBarn,
    velgBarn,
    nesteSteg,
}) => {
    return (
        <SideContainer className={'mine-barn'}>
            <h1>Mine barn</h1>
            <ul className={'mine-barn__liste'}>
                {barn.map(b => (
                    <li key={b.navn}>
                        <Barn valgt={b.navn === valgtBarn.navn} barn={b} onClick={velgBarn} />
                    </li>
                ))}
            </ul>
            <Hovedknapp onClick={nesteSteg}>Neste</Hovedknapp>
        </SideContainer>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: selectBarn(state),
        valgtBarn: selectValgtBarn(state),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        nesteSteg: () => dispatch(appNesteSteg()),
        velgBarn: barn => dispatch(soknadSettVerdi('mineBarn', 'valgtBarn', barn)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MineBarn);
