import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';

interface ISubmitKnappProps {
    children?: any;
}

const SubmitKnapp: React.StatelessComponent<ISubmitKnappProps> = ({
   children
}) => {
    return <KnappBase type='hoved' htmlType='submit'>{ children }</KnappBase>;
};

export default SubmitKnapp;
