import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IRootState } from '../../rootReducer';
import { IBarn } from '../../barn/types';
import { soknadSettVerdi } from '../../soknad/actions';
import Barn from './Barn';

interface IMapStateToProps {
    barn: IBarn[];
    valgtBarn: IBarn;
}

interface IMapDispatchToProps {
    velgBarn: (barn: IBarn) => any;
}

type MineBarnSideProps = IMapStateToProps & IMapDispatchToProps;

const MineBarnSide: React.StatelessComponent<MineBarnSideProps> = ({
    barn,
    valgtBarn,
    velgBarn
}) =>  {
    return (
        <div className={"mine-barn"}>
            <h1>Mine barn</h1>
            <ul className={"mine-barn__liste"}>
            {barn.map((b) =>
                <li key={ b.navn }>
                    <Barn
                        valgt={ b.navn === valgtBarn.navn}
                        barn={ b }
                        onClick={ velgBarn }
                    />
                </li>
            )}
            </ul>
            <Link to="/">Tilbake til hovedsiden</Link>
            <Link to="/omsorgssituasjon">Neste</Link>
        </div>
    );
};

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        barn: state.barn.barn,
        valgtBarn: state.soknad.barn,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        velgBarn: (barn) => dispatch(soknadSettVerdi('barn', barn))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MineBarnSide);
