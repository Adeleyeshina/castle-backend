import jwt from 'jsonwebtoken'
const generateTokenAndSetCookies = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN, {
        expiresIn: '1d'
    })

    res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    })
}

export default generateTokenAndSetCookies