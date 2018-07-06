import { HjelpetekstUnder } from 'nav-frontend-hjelpetekst';
import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { soknadSettVerdi } from '../../soknad/actions';
import { Svar } from '../../soknad/types';
import SpesifiserTextarea from './SpesifiserTextarea';

interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    forklaring?: string;
    harForklaring?: boolean;
    hjelpetekstNokkel?: string;
    verdi: Svar;
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
                        settSvar(value as Svar);
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
