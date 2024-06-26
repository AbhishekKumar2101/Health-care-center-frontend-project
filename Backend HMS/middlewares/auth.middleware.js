
const jwt=require('jsonwebtoken')
const User=require('../models/User')

module.exports= verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error("Unauthorized request")
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new Error("Invalid access token")
        }

        req.user = user;
        next()
    } catch (error) {
        next(error)

    }
}