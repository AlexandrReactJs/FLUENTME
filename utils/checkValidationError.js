import { validationResult } from "express-validator";


export const checkValidationError = (req, res, next) => {
    const error = validationResult(req)

    if(!error.isEmpty()) {
        res.status(400).json(error.array())
    }

    next()
}