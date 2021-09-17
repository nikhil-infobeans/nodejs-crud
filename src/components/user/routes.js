const router = require('express').Router();
const { registerUser, getAllUsers, getUserById, editUser, deleteUser, loginUser, requireAuth } = require('./controller/userController');
const { userValidationRules, validate, validateUserById, validateEditUser, validateLoginUser } = require('./model/userValidation')
const auth = require("../../middleware/auth");

router.post('/register', validate(userValidationRules),registerUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserDetail/:id', validate(validateUserById), getUserById);
router.put('/editUser/:id', validate(validateEditUser), editUser);
router.delete('/deleteUser/:id', validate(validateUserById), deleteUser);
router.post('/login', validate(validateLoginUser),loginUser);
router.get('/requireAuth', auth, requireAuth);

module.exports = router;
