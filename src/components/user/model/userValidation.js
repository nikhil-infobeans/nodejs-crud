'use strict';

const { body, validationResult, param } = require('express-validator')
const { checkEmailExist, getUserById } = require('./userModel');

const userValidationRules = [

      body('first_name')
        .not().isEmpty().withMessage('First Name is required').bail()
        .matches(/^(?=.*[a-zA-Z])([a-zA-Z\-\'\ \.])+$/).withMessage('Please enter a valid first name.'),
      body('last_name')
        .not().isEmpty().withMessage('Last Name is required.')
        .bail()
        .matches(/^(?=.*[a-zA-Z])([a-zA-Z\-\'\ \.])+$/).withMessage('Please enter a valid last name.'),
      body('email').not().isEmpty().withMessage('First Name is required.').bail()
        .isEmail().withMessage('Please enter a valid e-mail address.').bail()
        .custom(async email => {
            const value = await checkEmailExist(email);
            if (value) {
                throw new Error('Email already exists.');
            }
          }),
      body('password')
        .not().isEmpty().withMessage('First Name is required').bail()
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([A-Za-z0-9!@#$^&*()_]){8,14}$/).withMessage('Password must contain 8-14 characters with at least one number, one special character, uppercase and lowercase letter.'),
      body('mobile_number')
        .optional({ checkFalsy: true }).bail()
        .isMobilePhone().withMessage('Invalid mobile number'),
  ]

  const validateEditUser = [
    param('id')
      .not().isEmpty().withMessage('User id is required').bail()
      .isNumeric().withMessage('Invalid user id')
      .custom(async userId => {
        const value = await getUserById(userId);
        if (!value) {
            throw new Error("User doesn't exists.");
        }
      }),,
    body('first_name')
        .not().isEmpty().withMessage('First Name is required').bail()
        .matches(/^(?=.*[a-zA-Z])([a-zA-Z\-\'\ \.])+$/).withMessage('Please enter a valid first name.'),
    body('last_name')
      .not().isEmpty().withMessage('Last Name is required.')
      .bail()
      .matches(/^(?=.*[a-zA-Z])([a-zA-Z\-\'\ \.])+$/).withMessage('Please enter a valid last name.'),
    body('mobile_number')
      .optional({ checkFalsy: true }).bail()
      .isMobilePhone().withMessage('Invalid mobile number'),
  ];

  const validateUserById = [
    param('id')
      .not().isEmpty().withMessage('User id is required').bail()
      .isNumeric().withMessage('Invalid user id'),
  ];

const validate = (schemas)  => {

    return async (req, res, next) => {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = result.array();
      const extractedErrors = []
      errors.map(err => extractedErrors.push({ [err.param]: err.msg }))
      return res.status(422).json({
        success: false,
        errors: extractedErrors,
      })
    };
  }

module.exports = {
  userValidationRules,
  validateUserById,
  validateEditUser,
  validate,
}