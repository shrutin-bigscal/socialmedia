const Role = require("../model/role");
const user = require("../model/user");
// const verifyRoles = (...allowedRoles) => {
//     return (req, res, next) => {
//         console.log(req.role)
//         if (!req?.role) return res.sendStatus(401);
//         const rolesArray = [...allowedRoles];
//         a = rolesArray.toString();
//         const result = req.role.map(role => rolesArray.includes(role)).find(val => val === true);
//         if (!result) return res.sendStatus(401);
//         next();
//     }
// }

// module.exports = verifyRoles



// const verifyRoles = (role) => {
//     console.log('hello')
  
//     }

// }
// module.exports = verifyRoles