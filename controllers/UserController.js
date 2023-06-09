import UserModel from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import WordModel from "../models/Word.js";
import mongoose from 'mongoose';


export const register = async (req, res) => {
    try {
        const foundUser = await UserModel.findOne({ email: req.body.email })
        if (!foundUser) {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt)


            const doc = new UserModel({
                email: req.body.email,
                userWordsList: [],
                passwordHash
            })
            const user = await doc.save();


            const token = jwt.sign({ _id: user._id }, 'secret21', { expiresIn: '30d' })


            res.json({ ...user._doc, token })
            return;
        }

        res.status(400).json({ message: 'Пользователь с таким email уже есть!!!' })



    } catch (error) {
        console.log(error)

        res.status(400).json({ message: 'Не удалось зарегистрироваться' })
    }
}


export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            res.status(404).json({ message: 'Пользователь не найден' })
            return;
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPassword) {
            res.status(400).json({ message: 'Не верный логин или пароль' })
            return;
        }

        const token = jwt.sign({ _id: user._id }, 'secret21', { expiresIn: '30d' })

        res.json({ ...user._doc, token, statusCode: 0 })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось авторизоваться" })
    }
}

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            res.status(403).json({
                message: 'Пользователь не найден'
            })
            return;
        }

        const token = jwt.sign({
            _id: user._id,
        },

            'secret21',
            { expiresIn: '30d' }
        )

        res.json({ ...user._doc, token, statusCode: 0 })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Нет доступа'
        })
    }
}

export const addWordToUserWordList = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            res.status(404).json({ message: "Не удалось найти пользователя" })
            return;
        }

        const word = await WordModel.findById(req.body.wordId)
        if (!word) {
            res.status(404).json({ message: "Слово не найдено" })
            return;
        }

 
        user._doc.userWordsList.push(word)
        user.save()
        res.json(user)
      


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Не удалось добавить слово" })
    }
}


export const removeWordFromUserWordsList = async (req, res) => {
    try {
        const oIdUser = new mongoose.Types.ObjectId(req.userId)

        const oWordId = new mongoose.Types.ObjectId(req.params.id)

        await UserModel.findByIdAndUpdate(oIdUser, { $pull: { "userWordsList": { _id: oWordId } } }, { safe: true, upsert: true }).then(user => {
            res.json(user)
        }).catch(err => {
            res.json(err)
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Не удалось удалить слово'})
    }

}

export const getUserWordsList = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            res.json({ message: 'Пользователь не найден' })
            return;
        }

        res.json(user._doc.userWordsList)

    } catch (error) {
        res.status(500).json(error)
    }
}