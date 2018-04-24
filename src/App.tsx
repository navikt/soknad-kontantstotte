import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

export interface IAppProps {
    navn: string;
}

type Props = DispatchProp<{action: ()=> any}> & IAppProps;

const App: React.StatelessComponent<Props> = ({
    navn
}) => {
    return <h1>Søknad {navn}</h1>;
};

export default connect((state) => {
    console.log(state);
    return state;
})(App);