import express from 'express'
import { addAgent, allAgent, updateAgent } from '../controllers/agentController.js'

const router = express.Router()

router.get("/allAgent", allAgent)
router.post("/addAgent", addAgent)
router.put("/updateAgent", updateAgent)

export default router