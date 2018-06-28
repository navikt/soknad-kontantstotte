import HjelpetekstUnder from 'nav-frontend-hjelpetekst';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { soknadSettVerdi } from '../../soknad/actions';
import SpesifiserTextarea from './SpesifiserTextarea';

interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    forklaring?: string;
    harForklaring?: boolean;
    hjelpetekstNokkel?: string;
    verdi?: boolean;
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
    harForklaring,
    hjelpetekstNokkel
}) => {
    return (
        <div>
            {hjelpetekstNokkel &&
                <HjelpetekstUnder id={hjelpetekstNokkel}>
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

            { harForklaring && verdi === false &&
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
