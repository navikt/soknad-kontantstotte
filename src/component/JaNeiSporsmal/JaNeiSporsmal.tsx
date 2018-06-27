import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { soknadSettVerdi } from '../../soknad/actions';
import SpesifiserTextarea from "./SpesifiserTextarea";

interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    verdi?: boolean;
    forklaring?: string;
}

interface IMapDispatchToProps {
    settSvar: (verdi?: boolean) => any;
    settForklaring: (forklaring?: string) => any;
}

type JaNeiSporsmalProps = IMapDispatchToProps & ISporsmaalProps & InjectedIntlProps;

const JaNeiSporsmal: React.StatelessComponent<JaNeiSporsmalProps> = ({
    nokkel,
    verdi,
    forklaring,
    settSvar,
    settForklaring,
    sporsmalNokkel,
    intl
}) => {
    const visTekstomradeHvisNei = () => {
        if(verdi === false){
            return (
                <SpesifiserTextarea
                    nokkel={ nokkel }
                    forklaring={ forklaring }
                    settForklaring={ settForklaring }
                />
            );
        }
    };

    return (
        <div>
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

            { visTekstomradeHvisNei() }

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
