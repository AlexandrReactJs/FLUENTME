import jwt from "jsonwebtoken";



export const checkAuth = (req, res, next) => {

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret21')
            req.userId = decoded._id;
            next();
        } catch (error) {
            res.status(403).json({
                message: 'Нет доступа'
            })
        }
    }
}