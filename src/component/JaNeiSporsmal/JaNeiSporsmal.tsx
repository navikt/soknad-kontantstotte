import { HjelpetekstUnder } from 'nav-frontend-hjelpetekst';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ValidRadioPanelGruppe from '../../common/lib/validation/ValidRadioPanelGruppe';
import { soknadSettVerdi } from '../../soknad/actions';
import { Bolk, Felt, Svar } from '../../soknad/types';
import { harSvartPaJaNeiSporsmal } from '../../validators';
import SpesifiserTextarea from './SpesifiserTextarea';

interface ISporsmaalProps {
    bolk: Bolk;
    felt: Felt;
    sporsmalNokkel: string;
    verdi: Svar;
    forklaring?: string;
    harForklaring?: boolean;
    hjelpetekstNokkel?: string;
}

interface IMapDispatchToProps {
    settForklaring: (forklaring: string) => void;
    settSvar: (verdi: Svar) => void;
}

type JaNeiSporsmalProps = IMapDispatchToProps & ISporsmaalProps & InjectedIntlProps;

const JaNeiSporsmal: React.StatelessComponent<JaNeiSporsmalProps> = ({
    bolk,
    felt,
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
                legend={ intl.formatMessage({ id: sporsmalNokkel }) }
                name={ felt }
                validators={[
                    {
                        failText: intl.formatMessage({ id: 'svar.feilmelding' }),
                        test: () => harSvartPaJaNeiSporsmal(verdi)
                    }
                ]}
                onChange={ (evt: any, value: string) => settSvar(value as Svar) }
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
                    nokkel={ felt }
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
            dispatch(soknadSettVerdi(ownProps.bolk, `${ownProps.felt}Forklaring` as Felt, forklaring));
        },
        settSvar: (verdi: Svar) => {
            dispatch(soknadSettVerdi(ownProps.bolk, ownProps.felt, verdi));
        }
    };
};

export default connect(null, mapDispatchToProps)(injectIntl(JaNeiSporsmal));
