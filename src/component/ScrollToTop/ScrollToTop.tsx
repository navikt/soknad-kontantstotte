import * as React from 'react';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router';

class ScrollToTop extends React.Component<RouteComponentProps<RouteProps>> {
    private node: React.RefObject<HTMLDivElement>;
    constructor(props: RouteComponentProps<RouteProps>) {
        super(props);
        this.node = React.createRef();
    }
    public componentDidUpdate(prevProps: RouteProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
            if (this.node.current) {
                this.node.current.focus();
            }
        }
    }

    public render() {
        return (
            <div ref={this.node} tabIndex={-1}>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(ScrollToTop);
