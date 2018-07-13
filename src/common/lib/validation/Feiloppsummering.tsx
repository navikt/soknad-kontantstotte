import * as classNames from 'classnames';
import * as React from 'react';
import { SummaryError } from './types';

import './validering-style.less';

interface IFeiloppsummeringProps {
    show: boolean;
    title: string;
    className?: string;
    errors: SummaryError[];
}

const cls = (show: boolean, className?: string) =>
    classNames('feil-oppsummering-boks', className, {
        'feil-oppsummering-boks--visible': show,
    });

class Feiloppsummering extends React.Component<IFeiloppsummeringProps, {}> {
    private element: HTMLElement | null = null;
    public componentDidMount() {
        if (this.element) {
            this.element.focus();
        }
    }
    public render() {
        const { className, show, errors, title, ...other } = this.props;

        const listItems = errors.map(error => {
            const link = '#' + error.name;
            return (
                <li key={error.name}>
                    <a className="feil-oppsummering-boks__lenke" href={link}>
                        {error.text}
                    </a>
                </li>
            );
        });

        return (
            <article
                ref={node => {
                    this.element = node;
                }}
                tabIndex={-1}
                className={cls(show, className)}
                {...other}
            >
                <h1 className="typo-undertittel">{title}</h1>
                <ul className="feil-oppsummering-boks__liste">{listItems}</ul>
            </article>
        );
    }
}

export default Feiloppsummering;
