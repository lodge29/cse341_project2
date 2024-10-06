const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // 
    body('name', 'name is required').isString().isLowercase().withMessage('Name must be only letters and all lowercase'),
    // 
    body('age', 'age is required').isInt().withMessage('Age must be an INT (NUMBER)'),
    // 
    body('power', 'power is required').isString().isLowercase().withMessage('Power must be only letters and all lowercase'),
    // 
    body('email', 'email is required').isEmail().isLowercase().withMessage('Email must be a valid email format: email@domain.com'),
    // 
    body('favoriteColor', 'favorite color is required').isString().withMessage('Must be only letters'),
    // 
    body('favoriteSport', 'favorite sport is required').isString().withMessage('Must be only letters'),
    // 
    body('birthday')

  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate
}