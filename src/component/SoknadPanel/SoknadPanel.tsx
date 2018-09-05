import * as React from 'react';
import { Panel, default as PanelBase } from 'nav-frontend-paneler';

interface ISoknadPanelProps {
    children: React.ReactNode;
    className?: string;
}

const SoknadPanel: React.StatelessComponent<ISoknadPanelProps> = ({ children, className = '' }) => {
    return <PanelBase className={'soknad-panel ' + className}>{children}</PanelBase>;
};

export default SoknadPanel;
