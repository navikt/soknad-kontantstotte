import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { soknadSettVerdi } from '../../soknad/actions';
import SpesifiserTextarea from './SpesifiserTextarea';
import HjelpetekstUnder from "nav-frontend-hjelpetekst";

interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    verdi?: boolean;
    forklaring?: string;
    hjelpetekstNokkel?: string;
}

interface IMapDispatchToProps {
    settForklaring: (forklaring?: string) => any;
    settSvar: (verdi?: boolean) => any;
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
    hjelpetekstNokkel
}) => {
    return (
        <div>
            {hjelpetekstNokkel &&
                <HjelpetekstUnder id='hjelpetekst' tittel="test">
                    <FormattedMessage id={ hjelpetekstNokkel }/>
                </HjelpetekstUnder>
            }
            <RadioPanelGruppe
                legend={ intl.formatMessage(
                    {
                        id: sporsmalNokkel
                    }
                ) }
                name={ nokkel }
                onChange={
                    (event: React.SyntheticEvent<EventTarget>, value: string) => {
                        settSvar(value === 'true');
                    }
                }
                checked={ verdi !== undefined ? verdi.toString() : 'undefined' }
                radios={
                    [
                        { label: intl.formatMessage({ id: 'svar.ja' }), value: 'true' },
                        { label: intl.formatMessage({ id: 'svar.nei' }), value: 'false'}
                    ]
                }
            />

            { forklaring && verdi === false &&
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
