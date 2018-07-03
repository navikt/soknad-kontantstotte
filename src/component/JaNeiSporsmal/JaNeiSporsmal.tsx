import { HjelpetekstUnder } from 'nav-frontend-hjelpetekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ValidRadioPanelGruppe from '../../common/lib/validation/ValidRadioPanelGruppe';
import { soknadSettVerdi } from '../../soknad/actions';
import { Svar } from '../../soknad/reducer';
import SpesifiserTextarea from './SpesifiserTextarea';

interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    verdi: Svar;
    forklaring?: string;
    harForklaring?: boolean;
    hjelpetekstNokkel?: string;
}

interface IMapDispatchToProps {
    settForklaring: (forklaring?: string) => any;
    settSvar: (verdi: Svar) => any;
}

type JaNeiSporsmalProps = IMapDispatchToProps & ISporsmaalProps & InjectedIntlProps;

const JaNeiSporsmal: React.StatelessComponent<JaNeiSporsmalProps> = ({
    nokkel,
    verdi,
    forklaring,
    settSvar,
    settForklaring,
    sporsmalNokkel,
    intl,
    harForklaring,
    hjelpetekstNokkel,
}) => {
    return (
        <div>
            {hjelpetekstNokkel &&
                <HjelpetekstUnder id={hjelpetekstNokkel}>
                    <FormattedMessage id={ hjelpetekstNokkel }/>
                </HjelpetekstUnder>
            }
            <ValidRadioPanelGruppe
                legend={ intl.formatMessage(
                    {
                        id: sporsmalNokkel
                    }
                ) }
                name={ nokkel }
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => verdi !== Svar.UBESVART
                    }
                ]}
                onChange={
                    (event: React.SyntheticEvent<EventTarget>) => {
                        const element: HTMLBaseElement = (
                            (event.target as HTMLBaseElement).nextElementSibling as HTMLBaseElement
                        );
                        settSvar(element.innerText.toUpperCase() as Svar);
                    }
                }
                checked={ verdi }
                radios={
                    [
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: Svar.JA },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: Svar.NEI}
                    ]
                }
            />

            { harForklaring && verdi === Svar.JA &&
                <SpesifiserTextarea
                    nokkel={ nokkel }
                    forklaring={ forklaring }
                    settForklaring={ settForklaring }
                />
            }

        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ISporsmaalProps): IMapDispatchToProps => {
    return {
        settForklaring: (forklaring) => {
            dispatch(soknadSettVerdi(ownProps.nokkel + 'Forklaring', forklaring));
        },
        settSvar: (verdi) => {
            dispatch(soknadSettVerdi(ownProps.nokkel, verdi));
        }
    };
};

export default connect(null, mapDispatchToProps)(injectIntl(JaNeiSporsmal));
export {
    ISporsmaalProps
};
