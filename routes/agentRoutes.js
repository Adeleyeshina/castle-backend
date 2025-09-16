import express from 'express'
import { addAgent, allAgent, deleteAgent, singleAgent, updateAgent } from '../controllers/agentController.js'

const router = express.Router()

router.get("/allAgent", allAgent)
router.get("/agent/:id", singleAgent)
router.post("/addAgent", addAgent)
router.put("/updateAgent/:id", updateAgent)
router.delete("/deleteAgent/:id", deleteAgent)

export default router