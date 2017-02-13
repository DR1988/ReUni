/*eslint-disable*/
import * as handlers from './serverHandlers/handlers.js'

var bodyParser = require('body-parser')
const http = require('http')
const express = require('express')
const multer = require('multer')
const app = express()
let cors = require('cors')
const corsOptions = {
    origin: true,
    methods: [
        'GET',
        'POST',
        'OPTIONS',
        'PUT',
        'PATCH',
        'DELETE'
    ],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN']
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.trim().match(/\.[^\.]+$/)[0])
    }
})

let upload = multer({ storage: storage });

(function initWebpack() {
    const webpack = require('webpack')
    const webpackConfig = require('./webpack/common.config')
    const compiler = webpack(webpackConfig)

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }))

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))

    app.use(express.static(__dirname + '/'))
})()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// app.get('/getUser', getUser)

app.get('/getUserdata/:username', handlers.getUserdata)
app.post('/upload/:username', upload.single('photos'), handlers.uploadIMG)
app.post('/checkUser', handlers.checkUser)
app.post('/regUser', handlers.regUser)
app.get('/getAllFriends/:username', handlers.getAllFriends)
app.get('/getAllRequestedFriends/:username', handlers.getAllRequestedFriends)
app.get('/getAllResponsedFriends/:username', handlers.getAllResponsedFriends)
app.get('/getFiltred/:value', handlers.getFiltred)
app.post('/addToFriends', handlers.addToFriends)
app.post('/removeRequest', handlers.removeRequest)
app.post('/removeFriend', handlers.removeFriend)


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.get(/.*/, function root(req, res) {
    console.log('index');
    res.sendFile(__dirname + '/index.html')
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3001, function onListen() {
    const address = server.address()
    console.log('Listening on: %j', address)
    console.log(' -> that probably means: http://localhost:%d', address.port)
})