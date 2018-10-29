import * as moment from 'moment-timezone';
import Lenke from 'nav-frontend-lenker';
import PanelBase from 'nav-frontend-paneler';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { connect } from 'react-redux';
import SuksessIkon from '../../component/Ikoner/Suksessikon';
import Environment from '../../Environment';
import { IRootState } from '../../rootReducer';
import { isEnabled } from '../../toggles/selectors';
import { IToggleName } from '../../toggles/types';

interface IUtvidedInfoProps {
    intl: InjectedIntl;
}

interface IMapStateToProps {
    innsendtDato: moment.Moment;
    visInnsendtDato: boolean;
}

type Props = IMapStateToProps & IUtvidedInfoProps;

const UtvidetInfo: React.StatelessComponent<Props> = ({ intl, innsendtDato, visInnsendtDato }) => {
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

                                {visInnsendtDato && ' ' + innsendtDato.format('LLL') + '.'}
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

const mapStateToProps = (state: IRootState): IMapStateToProps => {
    return {
        innsendtDato: state.innsending.innsendtDato,
        visInnsendtDato: isEnabled(state, IToggleName.vis_innsendt_dato_kvittering),
    };
};

export default connect(mapStateToProps)(UtvidetInfo);
