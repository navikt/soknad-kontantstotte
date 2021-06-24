import { __awaiter } from "tslib";
import xss from 'xss';
export const escapeBody = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const søknad = req.body;
    req.body = JSON.parse(xss(JSON.stringify(søknad)));
    next();
});
//# sourceMappingURL=escape.js.map