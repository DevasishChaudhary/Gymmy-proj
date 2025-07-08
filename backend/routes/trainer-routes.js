const express = require('express');
const router = express.Router();
const { trainerRegistration,getAllTrainer,getTrainerById,updateTrainer,deleteTrainer } = require('../controllers/trainer-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware 

router.post('/register',authMiddleware, trainerRegistration); // Route for trainer registration
router.get('/all',authMiddleware, getAllTrainer); // Route for get all trainer
router.get('/:id',authMiddleware, getTrainerById); // Route for get trainer by id
router.put('/update/:id',authMiddleware, updateTrainer); // Route for update trainer
router.delete('/delete/:id',authMiddleware, deleteTrainer); // Route for delete trainer

module.exports = router;