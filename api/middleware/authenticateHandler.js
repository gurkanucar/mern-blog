const jwt = require("jsonwebtoken");
const UnAuthorizedError = require("../errors/unAuthorizedError");
const { validateToken } = require("../util/jwtUtil");
const { exemptedRoutes } = require("../auth/allowRoutes");


const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (isExemptedRoute(req.path, req.method, exemptedRoutes)) {
        return next();
    }

    if (!token) {
        throw new UnAuthorizedError("token not found!");
    }

    const decodedToken = validateToken(token);

    req.authenticatedUser = decodedToken;
    next();
};


const isExemptedRoute = (path, method, exemptedRoutes) => {
    for (const route of exemptedRoutes) {
        const pattern = new RegExp(`^${route.path.replace(/\*\*/g, '.*')
            .replace(/:[^/]+/g, '([^/]+)')}$`);

        const match = path.match(pattern);
        if (match) {
            if (!route.methods || route.methods.includes(method)) {
                return true;
            }
        }
    }
    return false;
};
// const isExemptedRoute = (path, exemptedRoutes) => {
//     for (const route of exemptedRoutes) {
//         const pattern = new RegExp(`^${route.replace(/\*\*/g, '.*')}$`);
//         if (pattern.test(path)) {
//             return true;
//         }
//     }
//     return false;
// };


module.exports = authenticateJWT;