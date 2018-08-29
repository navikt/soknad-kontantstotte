import Lenke from 'nav-frontend-lenker';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import SuksessIkon from '../../component/Ikoner/Suksessikon';
import Environment from '../../Environment';

interface IUtvidedInfoProps {
    intl: InjectedIntl;
}

const UtvidetInfo: React.StatelessComponent<IUtvidedInfoProps> = ({ intl }) => {
    return (
        <PanelBase className="kvittering__panel" border={true}>
            <table className="kvittering__utvidettabell" cellSpacing="0">
                <tbody>
                    <tr>
                        <td className="kvittering__utvidettabell__venstrekolonne">
                            <span
                                aria-label="suksess"
                                className="kvittering__utvidettabell__alertstripe__ikon"
                            >
                                <SuksessIkon />
                            </span>
                        </td>
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({
                                    id: 'kvittering.soknadSendt',
                                })}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="table__left-column" />
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({
                                    id: 'kvittering.soknadLokasjon',
                                })}{' '}
                                <Lenke href={Environment().saksoversikt} children={'Dine sider'} />
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="table__left-column" />
                        <td>
                            <span className="typo-normal">
                                {intl.formatMessage({
                                    id: 'kvittering.seOgsa',
                                })}{' '}
                                <Lenke
                                    href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV"
                                    children={'saksbehandlertidene'}
                                />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PanelBase>
    );
};

export default UtvidetInfo;
