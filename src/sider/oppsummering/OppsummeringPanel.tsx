import * as React from 'react';

const OppsummeringPanel: React.StatelessComponent<{}> = ({ children }) => {
    return <div className="panel panel--border oppsummering-panel">{children}</div>;
};

export { OppsummeringPanel };
