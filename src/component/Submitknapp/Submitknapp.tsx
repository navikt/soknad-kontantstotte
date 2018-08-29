import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface ISubmitKnappProps {
    label: string;
}

type SubmitKnappProps = ISubmitKnappProps;

const Submitknapp: React.StatelessComponent<SubmitKnappProps> = ({ label }) => {
    return (
        <KnappBase type="hoved" htmlType="submit">
            <FormattedMessage id={label} />
        </KnappBase>
    );
};

export default Submitknapp;
