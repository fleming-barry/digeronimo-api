const express = require('express')
const searchRouter = require('./routers/search')
const app = express()
const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../dist/TradeDatabaseClient');

app.use(express.json())
app.use(express.static(publicDirectoryPath))
app.use(searchRouter)

module.exports = app