// const exemptedRoutes = [
//     "/entries",
//     "/users/:userId/liked-entries",
//     "/:entryId/liked-users",
//     "/public/**",
//     "/auth/**",
// ];


const exemptedRoutes = [
    { path: "/entries/:id", methods: ["GET", "PUT"] },
    { path: "/users/:userId/liked-entries" },
    { path: "/:entryId/liked-users" },
    { path: "/auth/**" },
    { path: "/users/:id", methods: ["GET"] },
    { path: "/example", methods: ["POST", "PUT"] },
];

module.exports = {
    exemptedRoutes
}