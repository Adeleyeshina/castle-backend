import User from "../models/authModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndCookies from '../lib/cookiesAndToken.js'

export const signup = async (req, res) => {
    try {
        const { username, password, name } = req.body
        if (!username || !password || !name) {
            return res.status(401).json({ message: 'All input must be field' })
        }

        const usernameExist = await User.findOne({ username })

        if (usernameExist) {
            return res.status(400).json({ message: 'Username already exist' })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' })
        }

        const generateSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, generateSalt)
        const newUser = new User({
            name,
            username,
            password: hashedPassword
        })
        if (newUser) {
            generateTokenAndCookies(res, newUser._id)
            await newUser.save()
            return res.status(201).json({
                username: newUser.username
            })
        } else {
            return res.status(401).json({ message: 'Unable to create account' })
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ messaage: 'Internal Server Error' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        const isPassword = await bcrypt.compare(password, user?.password)

        if (user && isPassword) {
            generateTokenAndCookies(res, user._id)
            return res.status(200).json({
                username: user.username,
                _id: user._id,
                name: user.name
            })
        }
        res.status(400).json({ message: 'Invalid username or password' })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ messaage: 'Internal Server Error' })
    }
}

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).json({ message: 'Logout successfully' })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ messaage: 'Internal Server Error' })
    }
}
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password -__v")
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({ messaage: 'Internal Server Error' })
    }
}