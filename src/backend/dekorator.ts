import { RequestHandler } from 'express';
import jsdom from 'jsdom';
import NodeCache from 'node-cache';
import request from 'request';

import environment from './environment';

const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
    stdTTL: SECONDS_PER_HOUR,
    checkperiod: SECONDS_PER_MINUTE,
});

interface DekoratørRespons {
    NAV_SCRIPTS: string;
    NAV_STYLES: string;
    NAV_HEADING: string;
    NAV_FOOTER: string;
}

const getDecorator = (): Promise<DekoratørRespons> =>
    new Promise((resolve, reject) => {
        const decorator = cache.get<DekoratørRespons>('main-cache');
        if (decorator) {
            resolve(decorator);
        } else {
            request(environment().dekoratørUrl, (error, response, body) => {
                if (!error && response.statusCode >= 200 && response.statusCode < 400) {
                    const { document } = new JSDOM(body).window;
                    const prop = 'innerHTML';
                    const data = {
                        NAV_SCRIPTS: document.getElementById('scripts')[prop],
                        NAV_STYLES: document.getElementById('styles')[prop],
                        NAV_HEADING: document.getElementById('header-withmenu')[prop],
                        NAV_FOOTER: document.getElementById('footer-withmenu')[prop],
                    };
                    cache.set('main-cache', data);
                    resolve(data);
                } else {
                    reject(new Error(error));
                }
            });
        }
    });

export const indexHandler: RequestHandler = (_req, res) => {
    getDecorator()
        .then(fragments => {
            // eslint-disable-next-line
            // @ts-ignore
            res.render('index.html', fragments);
        })
        .catch(e => {
            console.log(e);
            const error = `En feil oppstod. Klikk <a href="https://www.nav.no">her</a> for å gå tilbake til nav.no. Kontakt kundestøtte hvis problemet vedvarer.`;
            res.status(500).send(error);
        });
};
export default indexHandler;
