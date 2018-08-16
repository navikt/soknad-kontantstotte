import { LOCATION_CHANGE, RouterState } from 'connected-react-router';

enum AppStatus {
    IKKE_STARTET = 'IKKE_STARTET',
    STARTER = 'STARTER',
    KLAR = 'KLAR',
    FEILSITUASJON = 'FEILSITUASJON',
    IKKE_TILGANG = 'IKKE_TILGANG',
}

interface ILocationChangeAction {
    type: typeof LOCATION_CHANGE;
    payload: RouterState;
}

export { AppStatus, ILocationChangeAction };
