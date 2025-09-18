import express from 'express'
import { getProfile, login, logOut, signup } from '../controllers/authController.js';
import protectedRoute from '../middleware/authMiddleware.js'

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logOut)
router.get("/profile", protectedRoute, getProfile)

export default router