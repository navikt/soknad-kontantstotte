import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import {AnyAction} from "redux";

export interface IAppProps {
    navn: string;
}

type Props = DispatchProp<AnyAction> & IAppProps;

const App: React.StatelessComponent<Props> = ({
    navn
}) => {
    return <h1>Søknad {navn}</h1>;
};

const mapStateToProps = (state: any, ownProp? :any):IAppProps  => ({
    navn: ownProp.navn
});

export default connect(mapStateToProps)(App);
