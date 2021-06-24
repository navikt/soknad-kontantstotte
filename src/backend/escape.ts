import { RequestHandler } from 'express';
import xss from 'xss';

export const escapeBody: RequestHandler = async (req, _res, next) => {
    const søknad: any = req.body;
    req.body = JSON.parse(xss(JSON.stringify(søknad)));
    next();
};
