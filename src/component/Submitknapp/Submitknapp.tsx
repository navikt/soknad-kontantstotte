import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface ISubmitKnappProps {
    label: string;
    onClick: () => void;
}

type SubmitKnappProps = ISubmitKnappProps;

const Submitknapp: React.StatelessComponent<SubmitKnappProps> = ({ label, onClick }) => {
    return (
        <KnappBase type="hoved" onClick={onClick}>
            <FormattedMessage id={label} />
        </KnappBase>
    );
};

export default Submitknapp;
