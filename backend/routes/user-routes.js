const express = require('express');
const router = express.Router();
const { userRegistration,userLogin,getAllUser,getUserById,updateUser,deleteUser,makeUserMember } = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware

router.post('/register', userRegistration); // Route for user registration
router.post('/login',userLogin); // Route for user login
router.get('/all',authMiddleware,getAllUser); // Route for get all user
router.get('/:id',authMiddleware,getUserById); // Route for get user by id
router.put('/update/:id',authMiddleware,updateUser); // Route for update user
router.delete('/delete/:id',authMiddleware,deleteUser); // Route for delete user
router.put('/make-member/:id',authMiddleware,makeUserMember); // Route for make user member

// router.get('/profile', authMiddleware, (req, res) => { // This route is protected by the authMiddleware and will return the user data after authentication.
//     // This route is protected by the authMiddleware
//     res.status(200).json({
//         success: true,
//         message: "User profile fetched successfully",
//         user: req.user // The user data is available here after authentication
//     });
// });

module.exports = router; // Exporting the router to use in server.js