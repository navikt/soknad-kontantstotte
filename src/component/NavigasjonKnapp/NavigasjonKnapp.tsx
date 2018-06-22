import { push } from 'connected-react-router';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { RouteProps } from 'react-router-dom';

export interface INavigasjonKnappProps {
    to: string;
}

type Props = INavigasjonKnappProps&DispatchProp&RouteProps;

class NavigasjonKnapp extends React.Component<Props> {

    constructor( props: Props ) {
        super(props);
    }

    public render() {
        return (
            <KnappBase type='hoved' onClick={() => this.navigasjonsHandler(this.props)}>
                {this.props.children}
            </KnappBase>
        );
    }

    private navigasjonsHandler(props: Props) {
        const to: string = props.to;
        props.dispatch(push(to));
    }
}

const mapStateToProps = (state: any) => ({
});

export default connect(mapStateToProps)(NavigasjonKnapp);
