import * as React from 'react';
import { connect } from 'react-redux';
import { IPerson } from '../../person/types';
import { IRootState } from '../../rootReducer';

import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import SideContainer from '../../component/SideContainer/SideContainer';
import KvitteringIkon from './ikoner/KvitteringIkon';
import UtskriftIkon from './ikoner/UtskriftIkon';

type KvitteringProps = IPerson & InjectedIntlProps;
const Kvittering: React.StatelessComponent<KvitteringProps> = () => {
    return (
        <SideContainer>
            <div className="kvittering-ikon-container">
                <KvitteringIkon className="kvittering-ikon" />
            </div>

            <h3 className="kvittering-tittel">{`Takk for søknaden, !`}</h3>

            <UtvidetInfo />

            <div className="utskrift-knapp-container">
                <KnappBase className="utskrift-knapp" type={'standard'}>
                    <UtskriftIkon className="utskrift-ikon" /> {'Skriv ut kvittering'}
                </KnappBase>
            </div>
        </SideContainer>
    );
};

const UtvidetInfo = () => {
    const formaterDatoElement = (element: number) => {
        const stringElement = element.toString();
        return stringElement.length === 1 ? `0${stringElement}` : stringElement;
    };

    const formaterManed = (manedIndes: number) => {
        switch (manedIndes) {
            case 1:
                return 'januar';
            case 2:
                return 'februar';
            case 3:
                return 'mars';
            case 4:
                return 'april';
            case 5:
                return 'mai';
            case 6:
                return 'juni';
            case 7:
                return 'juli';
            case 8:
                return 'august';
            case 9:
                return 'september';
            case 10:
                return 'oktober';
            case 11:
                return 'november';
            case 12:
                return 'desember';
        }
    };

    const formaterDato = (date: Date) => {
        return `${formaterDatoElement(date.getDate())}. ${formaterManed(
            date.getMonth()
        )} ${date.getFullYear()} kl. ${formaterDatoElement(date.getHours())}:${formaterDatoElement(
            date.getMinutes()
        )}`;
    };

    return (
        <PanelBase className="kvittering-panel" border={true}>
            <table id="utvidet-info" cellSpacing="0">
                <tbody>
                    <tr>
                        <td className="left-column">
                            <span aria-label="suksess" className="alertstripe__ikon">
                                <svg viewBox="0 0 24 24" width="1.5em" height="1.5em">
                                    <title>Suksess</title>
                                    <g fillRule="evenodd" fill="#06893A">
                                        <path
                                            d={
                                                'M10 16a.502.502 0 0 1-.354-.147l-2.5-2.5a.5.5 0 0 1 .707-.707l2.16 2.158 7.145-6.67a.502.502 0 0 1 .707.024.502.502 0 0 1-.024.707l-7.5 7a.5.5 0 0 1-.34.134z'
                                            }
                                        />
                                        <path
                                            d={
                                                'M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-23C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1z'
                                            }
                                        />
                                    </g>
                                </svg>
                            </span>
                        </td>
                        <td>
                            <span className="typo-normal alertstripe_tekst">{`Du har sendt inn søknaden ${formaterDato(
                                new Date()
                            )}`}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="left-column" />
                        <td>
                            <span className="typo-normal alertstripe_tekst">
                                Du finner søknaden din under{' '}
                                <a href="" className="lenke">
                                    Dine saker
                                </a>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td className="left-column" />
                        <td>
                            <span className="typo-normal alertstripe_tekst">
                                Se også{' '}
                                <a href="" className="lenke">
                                    saksbehandlertidene
                                </a>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </PanelBase>
    );
};

const mapStateToProps = (state: IRootState): IPerson => {
    return state.person.person;
};

export default injectIntl(
    connect(
        mapStateToProps,
        null
    )(Kvittering)
);
