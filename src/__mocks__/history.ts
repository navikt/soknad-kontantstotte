import { History, Module as HistoryModule } from 'history';
import { mock } from 'jest-mock-extended';

const history = jest.createMockFromModule<HistoryModule>('history');
const { createBrowserHistory: realCreateBrowserHistory } =
    jest.requireActual<HistoryModule>('history');

const mockedHistoryArray: string[] = [];

const historyHolder = {
    browserHistory: null,
    mockedHistory: null,
};

history.createBrowserHistory = props => {
    return historyHolder.browserHistory ?? realCreateBrowserHistory(props);
};

const listeners = {};

const createMockedHistory = () =>
    mock<History>({
        ...historyHolder.browserHistory,
        length: mockedHistoryArray.length,
        push: (location: string) => {
            mockedHistoryArray.push(location);
            historyHolder.browserHistory.push(location);
        },

        goBack: () => {
            const siste = historyHolder.browserHistory.location;
            // Jest kaller ikke window event listeners automatisk, så vi fikser det sjæl, synkront
            listeners['popstate'] &&
                listeners['popstate'].forEach((listener: (e) => void) => {
                    listener(new PopStateEvent('POP'));
                });

            historyHolder.browserHistory.goBack();
            const nå = historyHolder.browserHistory.location;

            /*
             * Dette er ikke helt sånn browser history funker, tror egentlig man skal pushe forrige
             * state på toppen av stacken, men dette er close enough for vårt bruk nå.
             */
            siste !== nå && mockedHistoryArray.pop();
        },
    });

const __setHistory = (history: string[]) => {
    window.history.replaceState({}, null, history[history.length - 1] ?? '/');

    // Jest driver og resetter denne spionen, så vi setter den hver gang noen mocker historyen
    jest.spyOn(window, 'addEventListener').mockImplementation((e, f) => {
        listeners[e] = [...(listeners[e] ?? []), f];
    });

    historyHolder.browserHistory = realCreateBrowserHistory();

    while (mockedHistoryArray.length > 0) {
        mockedHistoryArray.pop();
    }
    mockedHistoryArray.push(...history);
    historyHolder.mockedHistory = createMockedHistory();
    return { mockedHistory: historyHolder.mockedHistory, mockedHistoryArray };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
history.__setHistory = __setHistory;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
history.__getMockedHistoryArray = () => mockedHistoryArray;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
history.__getMockedHistory = () => historyHolder.mockedHistory;

module.exports = history;
