import Input from "nav-frontend-skjema/lib/input";
import * as React from "react";
import DatoFelt from "./DatoFelt";
import InjectedIntl = ReactIntl.InjectedIntl;

export const ekstrafelterForHarFaattPlass = (settFelt: (nokkel: string, verdi: string) => any, intl: InjectedIntl)  => {
    return (
        <div>
            <DatoFelt
                nokkel={intl.formatMessage({id: 'barnehageplass.harFaattPlassDato'})}
                settDato={(dato) => settFelt('harFaattPlassFraDato', dato.toDateString())}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('harFaattPlassKommune', event.target.value)}
            />
        </div>
    );
};

export const ekstrafelterForJa = (settFelt: (nokkel: string, verdi: string) => any, intl: InjectedIntl) => {
    return (
        <div>
            <DatoFelt
                nokkel={intl.formatMessage({id: 'barnehageplass.harFaattPlassDato'})}
                settDato={(dato) => settFelt('jaFraDato', dato.toDateString())}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaKommune', event.target.value)}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.antallTimer'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('jaAntallTimer', event.target.value)}
            />
        </div>
    );
};

export const ekstrafelterForJaSkalSlutte = (settFelt: (nokkel: string, verdi: string) => any, intl: InjectedIntl) => {
    return (
        <div>
            <DatoFelt
                nokkel={intl.formatMessage({id: 'barnehageplass.skalSlutteDato'})}
                settDato={(dato) => settFelt('skalSlutteDato', dato.toDateString())}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.kommune'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('skalSlutteKommune', event.target.value)}
            />
            <Input
                label={intl.formatMessage({id: 'barnehageplass.antallTimer'})}
                bredde={'M'}
                onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
                    settFelt('skalSlutteAntallTimer', event.target.value)}
            />
        </div>
    );
};
