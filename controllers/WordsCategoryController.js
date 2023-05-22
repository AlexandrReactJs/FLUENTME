import WordsCategoryModel from "../models/WordsCategory.js";
import AdminModel from '../models/Admin.js'
import WordModel from '../models/Word.js'

export const createCategory = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.userId)
        if (!admin) {
            res.status(404).json({ message: 'Пользователь не найден' })
        }

        const double = await WordsCategoryModel.findOne({ name: req.body.name })

        if (!double) {
            const doc = new WordsCategoryModel({
                name: req.body.name,
                engName: req.body.engName,
                imageUrl: req.body.imageUrl
            })

            const category = await doc.save();
            res.json({ category, resultCode: 0 })


        }else{
            res.status(404).json({ message: 'double', resultCode: 1 })
        }

        

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Не удалось создать категорию' })
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const categories = await WordsCategoryModel.find()

        res.json(categories)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Не удалось получить категории" })
    }
}



export const removeCategory = async (req, res) => {
    const admin = await AdminModel.findById(req.userId)
    if (!admin) {
        res.status(404).json({ message: 'Пользователь не найден' })
    }

    const categoryId = req.params.id;
    const category = await WordsCategoryModel.findOne({_id: categoryId})
    if(!category){
        res.status(404).json({message: "Категория не найдена"})
    }
    
    await WordsCategoryModel.deleteOne({_id: categoryId})
    await WordModel.deleteMany({category: category.engName})
    res.json({resultCode: 0})

}