import { body, validationResult } from "express-validator"
import fs from 'fs'

export const validateFn = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        if (req.file) {
            await fs.unlink('./api/uploads/profile/' + req.file.filename, (err) => (console.log(err)))
        }
        return res.status(400).json({ "message": "Invalid Inputs", "errors": errors.array() })
    }
    next()
}

export const validateUpdateData = [
    body('firstName')
        .optional().trim().notEmpty().withMessage('FirstName is Required')
        .isString().isAlpha().withMessage('FirstName should contain only Alphabet Characters')
        .isLength({ min: 3, max: 15 }).withMessage('FirstName should contain atleast 3 & maximum 15 Characters'),

    body('lastName')
        .optional().trim().notEmpty().withMessage('Last Name is required')
        .isString().isAlpha().withMessage('LastName should contain only Alphabet Characters')
        .isLength({ min: 3, max: 15 }).withMessage('Last Name should have minimum 3 and maximum 15 characters'),

    body('email')
        .optional().trim().notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Email should be a proper Email'),

    body('phone')
        .optional().trim().notEmpty().withMessage('Phone Number is required')
        .isInt().withMessage('Phone Number should contain only Numbers')
        .isLength({ min: 10, max: 12 }).withMessage('Phone Number should be of 10 digit'),

    body('gender')
        .optional().trim().notEmpty().withMessage('Gender is required')
        .isString().withMessage('Gender should be Male or Female only'),

    body('password')
        .optional().trim().notEmpty().withMessage('Password is required')
        .isStrongPassword().withMessage('Password should be Strong Password'),
]