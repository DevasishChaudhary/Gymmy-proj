const express = require('express');
const router = express.Router();
const { userRegistration,userLogin } = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware

router.post('/register', userRegistration); // Route for user registration
router.post('/login',userLogin); // Route for user login
router.get('/profile', authMiddleware, (req, res) => {
    // This route is protected by the authMiddleware
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: req.user // The user data is available here after authentication
    });
});

module.exports = router; // Exporting the router to use in server.js