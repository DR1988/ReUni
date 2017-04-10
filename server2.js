const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SerialPort = require('serialport')

const app = express()

const velocity = require('./serverHandlers/constants').velocity

let serialPort
let intervalId
const sse = require('./serverHandlers/sse.js')

const corsOptions = {
  origin: true,
  methods: [
    'GET',
    'POST',
    'OPTIONS',
    'PUT',
    'PATCH',
    'DELETE',
  ],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN']
}


app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

app.use(sse)

const counter = { distance: 0, time: 0 }
const connections = []

app.get('/stream', (req, res) => {
  res.sseSetup()
  // res.sseSend(counter)
  connections.push(res)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/start', (req, res) => {
  // console.log(req.body.lineFormer)
  const lines = []
  const linesOfActions = req.body.lineFormer
  // console.log('req.body', linesOfActions[8].changes)
  // console.log(linesOfActions)
  for (let j = 0; j < linesOfActions.length; j++) {
    if (linesOfActions[j].changes.length) {
      for (let i = 0; i < linesOfActions[j].changes.length; i++) {
        linesOfActions[j].changes[i].idname = linesOfActions[j].name[0] + linesOfActions[j].id
        lines.push(linesOfActions[j].changes[i])
      }
    }
  }

  // console.log('lines', lines)
  let currentTime = 0
  let sendingCommands = ''
  intervalId = setInterval(() => {
    lines.forEach(line => {
      if (line.startTime === currentTime) {
        // console.log(line.idname)
        if (line.idname === 'V0') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V1') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V2') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V3') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V4') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V5') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V6') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'V7') {
          sendingCommands = sendingCommands.concat(`${line.idname}Y|`)
        }
        if (line.idname === 'R8') {
          // console.log('RPM line sendind', line.idname, line.value)
          if (line.waitForValue) {
            // console.log('counter.time', counter.time)
            let curDistance
            for (let i = 0; i < connections.length; i++) {
              curDistance = currentTime
              connections[i].sseSend({
                action: 'STOP',
                curDistance,
              })
            }
            setTimeout(() => {
              counter.distance = req.body.allTime
              counter.time = (req.body.allTime - curDistance) / velocity
              for (let i = 0; i < connections.length; i++) {
                connections[i].sseSend({
                  action: 'START',
                  ...counter,
                })
              }
            }, 3000)
          }
          sendingCommands = sendingCommands.concat(`${line.idname}${line.value}|`)
        }
        if (line.idname === 'T9') {
          sendingCommands = sendingCommands.concat(`${line.idname}${line.value}|`)
          // console.log('temperature line sending', line.idname, line.value)
        }
      } else if (line.endTime === currentTime) {
        if (line.idname === 'R8') {
          sendingCommands = sendingCommands.concat(`${line.idname}0|`)
          // console.log(line.idname, 0)
        }
        if (line.idname === 'T9') {
          sendingCommands = sendingCommands.concat(`${line.idname}0|`)
          // console.log(line.idname, 0)
        }
        // if (/V\d+/.test(line.idname)) {
        //   console.log('asdasdadasadasd')
        //   sendingCommands = sendingCommands.concat(`${line.idname}N|`)
        // }
      }
    })
    if (sendingCommands) {
      // console.log('sendingCommands = ', sendingCommands)
      // serialPort.write(`${sendingCommands}\n`)
      sendingCommands = ''
    }
    if (currentTime >= req.body.allTime) {
      clearInterval(intervalId)
    }
    ++currentTime
    console.log(currentTime)
    // if (currentTime % 10 === 0) {
    //   // console.log('currentTime', currentTime)
    // }
  }, 1000 / velocity)
  counter.distance = req.body.allTime
  counter.time = req.body.allTime / velocity
  console.log('counter', counter.distance, counter.time)
  if (connections.length !== 0) {
    for (let i = 0; i < connections.length; i++) {
      connections[i].sseSend({
        action: 'START',
        ...counter,
      })
    }
  }
  res.status(200).end()
})

app.get('/connect', (req, res) => {
  if (!serialPort){
    SerialPort.list((err, ports) => {
      ports.forEach(port => {
        if (port.manufacturer.includes('Arduino')) { // have to change it because we can use not only Arduino
          serialPort = new SerialPort(port.comName, {
            baudRate: 9600,
            parser: SerialPort.parsers.readline('\n'),
          })
          serialPort.on('open', () => {
            res.send({
              message: 'opened',
            }).end()
            console.log('opened')
          })
          serialPort.on('data', (data) => {
            console.log(`data ${data}`)
          })
        }
      })
    })
  } else {
    console.log('already opened!')
    res.send({
      message: 'already opened',
    }).end()
  }
})

app.get('/reset', (req, res) => {
  console.log(111111)
  clearInterval(intervalId)
  for (let i = 0; i < connections.length; i++) {
    connections[i].sseSend({
      action: 'RESET',
    })
  }
  res.status(200).end()
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3333, function onListen() {
  const address = server.address()
  console.log('Listening on: %j', address)
  console.log(' -> that probably means: http://localhost:%d', address.port)
})
