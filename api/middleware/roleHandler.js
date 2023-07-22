const RoleModel = require("../models/Role");

const jwtRoleHandler = (requiredRoles) => async (req, res, next) => {
    try {

        console.log("Role Handler");

        const userRole = req?.authenticatedUser.roles;
        if (!userRole) {
            return res.status(403).json({ error: "Forbidden - Role not found" });
        }

        const userRoles = Array.isArray(userRole) ? userRole : [userRole];
        const hasSufficientRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasSufficientRole) {
            return res.status(403).json({ error: "Forbidden - Insufficient role" });
        }
        next();
    } catch (error) {
        console.error("JWT Role Handler Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = jwtRoleHandler;
