import path from 'path'
import webpackMiddleWare from './middlewares/webpack.js'

const http = require('http')
const express = require('express')

const app = express()

app.use(webpackMiddleWare)
app.use(express.static('./../index.html'))

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3001, function onListen() {
    const address = server.address()
    console.log('Listening on: %j', address)
    console.log(' -> that probably means: http://localhost:%d', address.port)
})