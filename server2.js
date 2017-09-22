import socket from 'socket.io'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SerialPort = require('serialport')

const app = express()
const http = require('http').Server(app)

const velocity = require('./serverHandlers/constants').velocity

let serialPort
let intervalId
let intervalId2

const io = socket(http)

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
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'X-CSRF-TOKEN'],
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

const counter = { distance: 0, time: 0 }

io.on('connection', sock => {
  console.log('a user connected')
  sock.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/check', (req, res) => {
  const linesOfActions = req.body
  console.log('linesOfActions', linesOfActions)
  //console.log(11111)
  /* V6Y|V7Y| */
  // V6Y|V7Y|R80|T90|
  // const sendingCommands = 'R84000|\n'
  const sendingCommands = `${linesOfActions.values}\n`
  serialPort.write(sendingCommands)

  // var i = 0
  // const inter = setInterval(() => {
  //   if (i++ < sendingCommands.length) {
  //     console.log(sendingCommands[i])
  //     serialPort.write(sendingCommands[i].toString())
  //   } else {
  //     clearInterval(inter)
  //   }
  // },
  // 400)

  // serialPort.write(sendingCommands)
  // setInterval(() => serialPort.write(sendingCommands), 300)
  // setTimeout(function() {
    // serialPort.write('\n')
  // }, 300)
  // serialPort.write('F')
  res.status(200).end()
})

app.post('/start', (req, res) => {
  // console.log(req.body.lineFormer)
  const lines = []
  const linesOfActions = req.body.lineFormer
  console.log('linesOfActions', linesOfActions)
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
  const start = () => {
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
            // if (line.waitForValue) {
            //   const curDistance = currentTime
            //   io.emit('STOP', {
            //     curDistance,
            //   })
            //   intervalId2 = setTimeout(() => {
            //     console.log('gavno gopa !!!!!!!!!!!!!!!!!!!')
            //     start()
            //     counter.distance = req.body.allTime
            //     counter.time = (req.body.allTime - curDistance) / velocity
            //     io.emit('START', {
            //       ...counter,
            //     })
            //   }, 3000)
              // console.log('intervalId2', intervalId2)
              // clearInterval(intervalId)
            // }
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
          if (/V\d+/.test(line.idname)) {
            // console.log('asdasdadasadasd')
            sendingCommands = sendingCommands.concat(`${line.idname}N|`)
          }
        }
      })
      if (sendingCommands) {
        console.log('sendingCommands = ', sendingCommands)
        // serialPort.write(`${sendingCommands}\n`)
        sendingCommands = ''
      }
      if (currentTime >= req.body.allTime) {
        clearInterval(intervalId)
      }
      ++currentTime
      // console.log(currentTime)
      // if (currentTime % 10 === 0) {
      //   // console.log('currentTime', currentTime)
      // }
    }, 1000 / velocity)
  }
  start()
  counter.distance = req.body.allTime
  counter.time = req.body.allTime / velocity
  console.log('counter', counter.distance, counter.time)
  io.emit('START', {
    ...counter,
  })

  res.status(200).end()
})

app.get('/connect', (req, res) => {
  if (!serialPort || !serialPort.isOpen()) {
    SerialPort.list((err, ports) => {
      ports.forEach(port => {
        if (port.manufacturer.includes('Arduino')) { // have to change it because we can use not only Arduino
          serialPort = new SerialPort(port.comName, {
            // baudRate: 9600,
            baudRate: 250000,
            parity: 'none',
            parser: SerialPort.parsers.readline('\n'),
          })
          serialPort.on('open', () => {
            res.send({
              message: 'opened',
            }).end()
            console.log('opened')
          })
          serialPort.on('data', (data) => {
            console.log(`${data}`, ' - data')
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
  console.log(intervalId2)
  clearInterval(intervalId2)
  clearInterval(intervalId)
  io.emit('RESET')
  res.status(200).end()
})

// const server = http.createServer(app)
http.listen(process.env.PORT || 3333, function onListen() {
  const address = http.address()
  console.log('Listening on: %j', address)
  console.log(' -> that probably means: http://localhost:%d', address.port)
})
