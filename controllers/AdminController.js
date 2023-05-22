import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import adminModel from '../models/Admin.js';


export const registerAdmin = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt)
        

        const doc = new adminModel({
            email: req.body.email,
            name: req.body.name,
            passwordHash
        })
        const admin = await doc.save();


        const token = jwt.sign({_id: admin._id}, 'secret312', { expiresIn: '30d' })

        
        res.json({...admin._doc, token})


        
    } catch (error) {
        console.log(error)

        res.status(500).json({message: 'Не удалось зарегистрироваться'})
    }
}



export const loginAdmin = async (req, res) => {
    try {
        const admin = await adminModel.findOne({email: req.body.email})

        if(!admin) {
            res.status(404).json({message: 'Админ не найден'})
        }

        const isValidPassword = await bcrypt.compare(req.body.password, admin._doc.passwordHash)

        if(!isValidPassword) {
            res.status(400).json({message: 'Не верный логин или пароль'})
        }

        const token = jwt.sign({_id: admin._id}, 'secret312', { expiresIn: '30d' })

        res.json({...admin._doc, token, statusCode: 0 })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Не удалось авторизоваться"})
    }
}


export const adminAuthMe = async (req, res) => {
    try {
        const admin = await adminModel.findById(req.userId)
        if(!admin){
            res.status(403).json({
                message: 'Пользователь не найден'
            })
        }

        const token = jwt.sign({
            _id: admin._id
        },
            'secret312',
            { expiresIn: '30d' }
        )

        res.json({...admin._doc, token, statusCode: 0})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Нет доступа'
        })
    }
}