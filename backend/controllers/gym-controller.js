const GymEquipment=require("../models/equipment");
const GymClass=require("../models/gymClass");
const User=require("../models/user");

// for gym equipment
const addGymEquipment = async (req, res) => {
    try {
        const { name, type, brand, model, purchaseDate, condition, lastMaintenance, location } = req.body;
        if (!name || !type || !location) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const newEquipment = new GymEquipment({
            name,
            type,
            brand,
            model,
            purchaseDate,
            condition,
            lastMaintenance,
            location,
        });
        await newEquipment.save();
        return res.status(201).json({
            success: true,
            message: "Equipment added successfully",
            equipment: newEquipment,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
        });
    }
};
// getall equipment
const getAllEquipment = async (req, res) => {
    try {
        const equipment = await GymEquipment.find();
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Equipment fetched successfully",
            equipment,
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
//delete equipment
const deleteEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide equipment id",
            });
        }
        const equipment = await GymEquipment.findByIdAndDelete(id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Equipment deleted successfully",
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
// update equiment
const updateEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide equipment id",
            });
        }
        const { name, type, brand, model, purchaseDate, condition, lastMaintenance, location } = req.body;
        if (!name || !type || !location) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const equipment = await GymEquipment.findByIdAndUpdate(id, {
            name,
            type,
            brand,
            model,
            purchaseDate,
            condition,
            lastMaintenance,
            location,
        });
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Equipment updated successfully",
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
//get single equipment
const getSingleEquipment = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide equipment id",
            });
        }
        const equipment = await GymEquipment.findById(id);
        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Equipment fetched successfully",
            equipment,
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



// for gym class
const addGymClass = async (req, res) => {
    try {
        const { name, description, instructor, location, schedule, capacity, difficulty } = req.body;
        if (!name || !instructor || !location || !schedule || !capacity) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const newClass = new GymClass({
            name,
            description,
            instructor,
            location,
            schedule,
            capacity,
            difficulty,
        });
        await newClass.save();
        return res.status(201).json({
            success: true,
            message: "Class added successfully",
            gymClass: newClass,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
        });
    }
};
//get allclass
const getAllClass = async (req, res) => {
    try {
        const gymClass = await GymClass.find();
        if (!gymClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Class fetched successfully",
            gymClass,
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
//delete class
const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide class id",
            });
        }
        const gymClass = await GymClass.findByIdAndDelete(id);
        if (!gymClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Class deleted successfully",
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
//update class
const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide class id",
            });
        }
        const { name, description, instructor, location, schedule, capacity, difficulty } = req.body;
        if (!name || !instructor || !location || !schedule || !capacity) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const gymClass = await GymClass.findByIdAndUpdate(id, {
            name,
            description,
            instructor,
            location,
            schedule,
            capacity,
            difficulty,
        });
        if (!gymClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Class updated successfully",
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
// gett single class
const getSingleClass = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide class id",
            });
        }
        const gymClass = await GymClass.findById(id);
        if (!gymClass) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Class fetched successfully",
            gymClass,
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
    addGymEquipment,
    addGymClass,
    getAllEquipment,
    getAllClass,
    deleteEquipment,
    deleteClass,
    updateEquipment,
    updateClass,
    getSingleEquipment,
    getSingleClass,
};  
