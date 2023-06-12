const express = require('express');
const userRouter = require('../routes/userRouter');
const medRouter = require('../routes/medRouter');

const app = express();
app.use(express.json())

app.use('/api/v1/users',userRouter)
app.use('/api/v1/med',medRouter)

module.exports = app;