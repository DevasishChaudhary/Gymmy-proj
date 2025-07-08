const express = require('express');
const router = express.Router();
const { addGymEquipment, addGymClass, getAllEquipment, getAllClass, deleteEquipment, deleteClass, updateEquipment, updateClass, getSingleEquipment, getSingleClass } = require('../controllers/gym-controller');
const authMiddleware = require('../middleware/auth-middleware'); // Importing the authentication middleware 

router.post('/equipment/register', authMiddleware, addGymEquipment); // Route for gym equipment registration
router.post('/class/register', authMiddleware, addGymClass); // Route for gym class registration
router.get('/equipment/all', authMiddleware, getAllEquipment); // Route for get all gym equipment
router.get('/class/all', authMiddleware, getAllClass); // Route for get all gym class
router.delete('/equipment/delete/:id', authMiddleware, deleteEquipment); // Route for delete gym equipment
router.delete('/class/delete/:id', authMiddleware, deleteClass); // Route for delete gym class
router.put('/equipment/update/:id', authMiddleware, updateEquipment); // Route for update gym equipment
router.put('/class/update/:id', authMiddleware, updateClass); // Route for update gym class
router.get('/equipment/:id', authMiddleware, getSingleEquipment); // Route for get single gym equipment
router.get('/class/:id', authMiddleware, getSingleClass); // Route for get single gym class

module.exports = router;