//require('dotenv').config()
const { KEY } = require('./key');
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const port = 3001
const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api', routes)

mongoose.connect(
    KEY
).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})