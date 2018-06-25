import RadioPanelGruppe from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import TextareaControlled from 'nav-frontend-skjema/lib/textarea-controlled';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { soknadSettVerdi } from '../../soknad/actions';
import { InjectedIntlProps, injectIntl } from 'react-intl';


interface ISporsmaalProps {
    nokkel: string;
    sporsmalNokkel: string;
    verdi?: boolean;
    forklaring?: string;
}

interface IMapDispatchToProps {
    settSvar: (felt: string, forklaring?: string, verdi?: boolean) => any;
}

type JaNeiSporsmalProps = IMapDispatchToProps & ISporsmaalProps & InjectedIntlProps;

const JaNeiSporsmal: React.StatelessComponent<JaNeiSporsmalProps> = ({
    nokkel,
    verdi,
    forklaring,
    settSvar,
    sporsmalNokkel,
    intl
}) => {

    const visUtfyllendeSvarTekst = (spesifiser: boolean|undefined): JSX.Element|undefined => {
        if (spesifiser === false) {
            return (
                <TextareaControlled
                    label={ intl.formatMessage(
                        {
                            id: 'tekstomrade.fyllInn'
                        }
                    ) }
                    defaultValue=''
                    maxLength={500}
                />
            );
        }
        return;
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
                        settSvar(nokkel, forklaring, value === 'true');
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
            { visUtfyllendeSvarTekst(verdi) }
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
    return {
        settSvar: (felt, forklaring, verdi) => {
            dispatch(soknadSettVerdi(felt, verdi));
            if (!verdi) {
                dispatch(soknadSettVerdi(felt + 'Forklaring', forklaring));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(injectIntl(JaNeiSporsmal));
