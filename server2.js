const http = require('http')
const express = require('express')
const app = express()
let cors = require('cors')
var bodyParser = require('body-parser')
var SerialPort = require("serialport");



var serialPort = new SerialPort("COM5", {
  baudRate: 9600,
  // bufferSize: 131072,
  parser: SerialPort.parsers.readline('\n')
});

const sse = require('./helpers/sse.js')

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

app.use(sse)

app.get('/stream', function(req, res) {
  console.log('connected')
  res.sseSetup()
  res.sseSend(counter)
  connections.push(res)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.post('/start', function(req, res) {
  console.log(req.body.lineFormer[8])
  const RPMsetter=req.body.lineFormer[8]
  const value = RPMsetter.changes[0].value
  // console.log(value.toString())
  serialPort.write(value.toString()+'\n')
  // setInterval(serialPort.write(value), 100)
  res.status(200).end()
})

serialPort.on("open", function () {
  console.log('opened')
});

let counterForLog = 0
serialPort.on('data', function(data){
    spData = data
    // if(++counterForLog > 4) {
      console.log('data ' + data)
      // counterForLog = 0
    // }
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3333, function onListen() {
    const address = server.address()
    console.log('Listening on: %j', address)
    console.log(' -> that probably means: http://localhost:%d', address.port)
})