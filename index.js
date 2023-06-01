import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createWord, getAllWords, getOneWord } from './controllers/WordController.js';
import { registerValidation, loginValidation } from './validations/validation.js';
import { checkValidationError } from './utils/checkValidationError.js';
import { register, login, authMe, addWordToUserWordList, removeWordFromUserWordsList } from './controllers/UserController.js';
import { checkAuth } from './utils/checkAuth.js';

import { createCategory, getAllCategory, removeCategory } from './controllers/WordsCategoryController.js';
import { loginAdmin, registerAdmin, adminAuthMe } from './controllers/AdminController.js';


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://gavalexandr732:backend_razrab@cluster0.4amzlal.mongodb.net/englishSchool?retryWrites=true&w=majority').then(() => {
    console.log('DB connect!!!')
}).catch((error) => {
    console.log('DB not connect', error)
})




app.post('/auth/register', registerValidation, checkValidationError, register )
app.post('/auth/login', loginValidation, checkValidationError, login)
app.get('/auth/me', checkAuth, authMe)


app.post('/user/addWordToUserWordList', checkAuth, addWordToUserWordList)
app.delete('/user/removeWordFromUserWordsList/:id', checkAuth, removeWordFromUserWordsList)

app.post('/admin/register', registerAdmin)
app.post('/admin/login', loginAdmin)
app.get('/admin/me', checkAuth, adminAuthMe)



app.post('/words/createWord', checkAuth, createWord)
app.get('/words/getAllWords', getAllWords)
app.get('/words/getOneWord/:id', getOneWord)



app.post('/wordsCategory/createCategory', checkAuth, createCategory)
app.get('/wordsCategory/getAllCategory', getAllCategory)
app.delete('/wordsCategory/removeCategory/:id', checkAuth, removeCategory)








app.listen(4444, (error) => {
    if(error) {
        console.log('Error ---> ', error)
    }

    console.log('Server started!!!')
})