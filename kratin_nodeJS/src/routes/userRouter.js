const express = require('express')

const {loginUser,registerUser,getMedications} = require('../controllers/userController')


const userRouter = express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.get('/medicine/:userId', getMedications)
module.exports = userRouter