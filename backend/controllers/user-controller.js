const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// for user register
const userRegistration = async (req, res) => {
    try {
        const { username, email, password, role, phone, address } = req.body;
       
        
         if (!username || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        // console.log(username, email, password, role, phone, address);
        
        const userexist = await User.findOne ({
            $or: [{ username }, { email }]
        });
        if (userexist) {
            return res.status(404).json({
                success: false,
                message: "A user with this username or email is alredy exist. Please try again with  different one",
            });


        }
       
        const salt = await bcrypt.genSalt(10); // unique key generate garxa
        const hashedPassword = await bcrypt.hash(password, salt); // password hash garxa

        //this will create a new user in the database
        const newuser = new User({
            username: username,
            email:email,
            password: hashedPassword,
            role: role || "user",
            phone: phone,
            address: address,

        });

        await newuser.save(); // save the user in the database

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newuser._id,
                role: newuser.role,
                username: newuser.username,
            }
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
            

        });
    }
}

//login user
// this function will login the user
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        const token = jwt.sign({ id: user._id,role:user.role}, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                role: user.role,

            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some error occured. Please try again",
        });
    }
}
// getall user
const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
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
//get user by id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide user id",
            });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
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
//update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = req.user.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide user id",
            });
        }
        if (id !== owner) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this user",
            });
        }
        const { username, email, password, role, phone, address } = req.body;
        if (!username || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }
        const user = await User.findByIdAndUpdate(id, {
            username,
            email,
            password,
            role,
            phone,
            address,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
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
//delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide user id",
            });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
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
// make user member
const makeUserMember = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Please provide user id",
            });
        }
        const user = await User.findByIdAndUpdate(id, {
            isMember: true,
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User made member successfully",
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
    userRegistration,
    userLogin,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    makeUserMember,
    
};