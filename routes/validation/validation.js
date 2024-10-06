const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // first name must be letters
    body('firstName').isString().isLowercase(),
    // last name must be letters
    body('lastName').isString(),
    // must be valid email format: email@domain.com
    body('email').isEmail(),
    // must be letters
    body('favoriteColor').isString(),
    // must be birthday format: mm/dd/yyyy
    body('birthday').isString(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate
}