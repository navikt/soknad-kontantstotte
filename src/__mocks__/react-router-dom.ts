import * as history from 'history';
const reactRouterDom = jest.requireActual('react-router-dom');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { __getMockedHistoryArray, __getMockedHistory } = history;

const useLocation = () => {
    const array = __getMockedHistoryArray();
    return {
        pathname: array[array.length - 1],
    };
};

const useHistory = () => __getMockedHistory();

module.exports = {
    ...reactRouterDom,
    useHistory,
    useLocation,
};
