const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // 
    body('name', 'name is required').isString().isLowercase().withMessage('Name must be only letters and all lowercase'),
    // 
    body('age').isInt().withMessage('Age must be an INT (NUMBER)'),
    // 
    body('power').isString().isLowercase().withMessage('Power must be only letters and all lowercase'),
    // 
    body('email').isEmail().isLowercase().withMessage('Email must be a valid email format: email@domain.com'),
    // 
    body('favoriteColor').isString().withMessage('Must be only letters'),
    // 
    body('favoriteSport').isString().withMessage('Must be only letters'),
    // 
    body('birthday').isString()

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