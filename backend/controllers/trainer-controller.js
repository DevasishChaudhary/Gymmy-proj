const Trainer = require("../models/trainer");
const User = require("../models/user");

// for trainer register
const trainerRegistration = async (req, res) => {
    try {
        const { name, startTime, endTime, type, experience } = req.body;
        if (!name || !startTime || !endTime || !type || !experience) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const newTrainer = new Trainer({
            name,
            startTime,
            endTime,
            type,
            experience,
        });
        await newTrainer.save();
        return res.status(201).json({
            success: true,
            message: "Trainer added successfully",
            trainer: newTrainer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
        });
    }
};

// getall trainer
const getAllTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.find();
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Trainer fetched successfully",
            trainer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
            error,
        });
    }
};

//get trainer by id 
const getTrainerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide trainer id",
            });
        }
        const trainer = await Trainer.findById(id);
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Trainer fetched successfully",
            trainer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
            error,
        });
    }
};

//update trainer    
const updateTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide trainer id",
            });
        }
        const { name, startTime, endTime, type, experience } = req.body;
        if (!name || !startTime || !endTime || !type || !experience) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const trainer = await Trainer.findByIdAndUpdate(id, {
            name,
            startTime,
            endTime,
            type,
            experience,
        });
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Trainer updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
            error,
        });
    }
};

//delete trainer    
const deleteTrainer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide trainer id",
            });
        }
        const trainer = await Trainer.findByIdAndDelete(id);
        if (!trainer) {
            return res.status(404).json({
                success: false,
                message: "Trainer not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Trainer deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
            error,
        });
    }
};

module.exports = {
    trainerRegistration,
    getAllTrainer,
    getTrainerById,
    updateTrainer,
    deleteTrainer,
};