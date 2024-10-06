const UserModel = require("../models/user.mode")

const checkAccess = (requireRole) =>{

    return ( async(req, res , next) =>{
        const {username } = req.body;
        const user = await  UserModel.findOne({username})

        if(user.role !== requireRole){
            return res.status(403).json({msg:"Access denied, Only admin can access this"})
        }
        next();
    })
}

module.exports = checkAccess;