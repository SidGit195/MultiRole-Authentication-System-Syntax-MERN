const ROLES = require('../config/roles');

const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({ msg: "Unauthorised"});
        }

        const hasRole = allowedRoles.includes(req.user.role);
        if(!hasRole) {
            return res.status(403).json({
                msg: 'Access forbidden: You do not have the required permission' 
            });
        }

        next();
    };
};

// predefined role checks
const isAdmin = checkRole(ROLES.ADMIN);            
const isManager = checkRole(ROLES.ADMIN, ROLES.MANAGER);                    // admin & manager allowed || user not allowed
const isUser = checkRole(ROLES.ADMIN, ROLES.MANAGER, ROLES.USER);           // anyone allowed

module.exports = {
    checkRole, 
    isAdmin, 
    isManager,
    isUser
};