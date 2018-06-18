import { push } from 'connected-react-router';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteProps } from 'react-router-dom';
import { gaTilSide } from '../../sider/side/actions';
import { ISideState } from '../../sider/side/reducer';
import { ISide, Sider } from '../../sider/side/side';

export interface INavigasjonKnappProps {
    to: string;
}

type Props = INavigasjonKnappProps&DispatchProp&RouteProps;

class NavigasjonKnapp extends React.Component<Props> {

    constructor( props: Props ) {
        super(props);
    }

    navigasjonsHandler(props: Props) {
        const to: string = props.to;
        props.dispatch(gaTilSide(Sider.filter((side: ISide) => side.path === to)[0]));
        props.dispatch(push(to));
    }

    render() {
        return (
            <KnappBase type='hoved' onClick={() => this.navigasjonsHandler(this.props)}>
                {this.props.children}
            </KnappBase>
        );
    }

}

const mapStateToProps = (state: ISideState) => ({
});

export default connect(mapStateToProps)(NavigasjonKnapp);
