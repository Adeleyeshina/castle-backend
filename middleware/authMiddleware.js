import jwt from 'jsonwebtoken'
import User from '../models/authModel.js'
const protectedRoute = async (req, res, next) => {
    const accessToken = req.cookies.token
    if (!accessToken) {
        return res.status(404).json({ message: "Your session has expired. Please login again to continue" })
    }
    try {
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN)

        const user = await User.findById(decode.userId).select("-password")
        if (!user) {
            return res.status(403).json({
                message: 'user not found'
            })
        }
        req.user = user
        next()

    } catch (error) {
        console.log("Error in protect routes middleware", error.message);
        return res.status(401).json({ message: "Unauthorized  Invalid access token" })
    }
}

export default protectedRoute