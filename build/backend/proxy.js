var _a;
import { createProxyMiddleware } from 'http-proxy-middleware';
import environment from './environment';
const restream = (proxyReq, req, _res) => {
    if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};
const apiPath = `^${(_a = process.env.BASE_PATH) !== null && _a !== void 0 ? _a : '/'}api`;
export const createApiForwardingFunction = () => {
    return createProxyMiddleware(apiPath.replace('^', ''), {
        target: environment().apiUrl,
        changeOrigin: true,
        logLevel: process.env.ENV === 'prod' ? 'silent' : 'debug',
        secure: true,
        onProxyReq: restream,
        pathRewrite: {
            [apiPath]: '/api',
        },
    });
};
//# sourceMappingURL=proxy.js.map