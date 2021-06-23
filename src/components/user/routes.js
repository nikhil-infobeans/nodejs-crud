const router = require('express').Router();
const { registerUser, getAllUsers, getUserById, editUser, deleteUser } = require('./controller/userController');
const { userValidationRules, validate, validateUserById, validateEditUser } = require('./model/userValidation')

router.post('/register', validate(userValidationRules),registerUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserDetail/:id', validate(validateUserById), getUserById);
router.put('/editUser/:id', validate(validateEditUser), editUser);
router.delete('/deleteUser/:id', validate(validateUserById), deleteUser);

module.exports = router;
