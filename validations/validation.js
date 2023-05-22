import {body} from 'express-validator'

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 10})
]


export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 10}),
    body('userName').isLength({min: 4})
]