import mongoose from 'mongoose';
import WordModel from '../models/Word.js';
import AdminModel from '../models/Admin.js';


export const getOneWord = async (req, res) => {
    try {
        const wordId = req.params.id

        WordModel.findOne({_id: wordId}).then((foundWord) => {
            if(foundWord){
                res.json(foundWord)
            }
        }).catch((error) => {
            res.status(404).json({message: "Не удалось найти слово"})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Не удалось получить слово"})
    }
}

export const getAllWords = async (req, res) => {
    try {
        const category = req.query.category;
        if(!category) {
            const words = await WordModel.find();
            res.json(words)
        }else{
            const words = await WordModel.find({category})
            res.json(words)
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Не удалось получить слова'})
    }
}
export const createWord = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.userId)
        if(!admin) {
            res.status(404).json({message: 'Пользователь не найден'})
        }
        const doc = new WordModel({
            word: req.body.word,
            translate: req.body.translate,
            category: req.body.category,
            usageExample: req.body.usageExample,
        })

        const word = await doc.save()

        res.json(word)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Не удалось добавить слово'})
    }
}

