import mongoose from "mongoose"
import Agent from "../models/agentModel.js"
export const allAgent = async (req, res) => {
    try {
        const agents = await Agent.find({})
        res.status(200).json(agents)
    } catch (error) {
        console.log("Error in All agent controller", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const addAgent = async (req, res) => {
    try {
        const { name, contact, occupation, location } = req.body
        if (!name || !contact || !occupation || !location) {
            return res.status(401).json({ message: "All the field must be field" })
        }
        await Agent.create(req.body)

        return res.status(201).json({message : 'Agent Added Succesfully'})
    } catch (error) {
        console.log("Error in Add agent controller", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

export const updateAgent = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "invalid Id" })
        }

        const agent = await Agent.findByIdAndUpdate(id, req.body, { new: true })
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' })
        }

        res.status(200).json(agent)
    } catch (error) {
        console.log("Error in update agent controller", error.message)
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}