import * as React from 'react';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router';

class ScrollToTop extends React.Component<RouteComponentProps<RouteProps>> {
    public componentDidUpdate(prevProps: RouteProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    public render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
