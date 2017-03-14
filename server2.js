const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SerialPort = require('serialport')

const app = express()

const velocity = require('./serverHandlers/constants').velocity

let serialPort
/*SerialPort.list((err, ports) => {
  ports.forEach(port => {
    if (port.manufacturer.includes('Arduino')) {
      serialPort = new SerialPort(port.comName, {
        baudRate: 9600,
        // bufferSize: 131072,
        parser: SerialPort.parsers.readline('\n'),
      })
      serialPort.on('open', () => {
        console.log('opened')
      })

      // let counterForLog = 0
      serialPort.on('data', (data) => {
        console.log(`data ${data}`)
      })
    }
  })
})*/

// var serialPort = new SerialPort("COM5", {
//   baudRate: 9600,
//   // bufferSize: 131072,
//   parser: SerialPort.parsers.readline('\n')
// });

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


const setValuesTimer = (actions) => { // move to helpers
  const action = actions.next()

  if (!action.done) {
    console.log(action.value.value)
    // serialPort.write(`${action.value.value}\n`)
    setTimeout(() => {
      setValuesTimer(actions)
    }, action.value.duration * 1000 / velocity)
  } else {
    // serialPort.write(`${0}\n`)
    console.log('done')
  }
}

app.post('/start', (req, res) => {
  // console.log(req.body.lineFormer)
  const arrOfDoing = []
  const arrOfActions = req.body.lineFormer[8].changes
  for (let j = 0; j < req.body.lineFormer.length; j++) {
    if (req.body.lineFormer[j].id === 9) {
      // console.log('1111111',req.body.lineFormer)
      let test = {}
      for (let i = 0; i < req.body.lineFormer[j].changes.length; i++) {
        req.body.lineFormer[j].changes[i].idname = req.body.lineFormer[j].name[0] + req.body.lineFormer[j].id
        test[i] = req.body.lineFormer[j].changes[i]
      }
      console.log('arrOfDoing', test)
    }
  }
  // console.log('arrOfActions', arrOfActions)
  const DTO = []
  const lastActions = arrOfActions.reduce((acc, curr) => {
    const gaps = { value: 0, duration: curr.startTime - acc.endTime }
    DTO.push(acc, gaps)
    return curr
  })
  DTO.push(lastActions)
  // console.log('DTO', DTO)
  const arrOfDoing2 = arrOfDoing[Symbol.iterator]()
  const actions = DTO[Symbol.iterator]()
  // console.log('arrOfDoing2', arrOfDoing2.next())
  // console.log('arrOfDoing3', arrOfDoing2.next())
  // console.log('arrOfDoing4', arrOfDoing2.next())
  // console.log(DTO)
  setValuesTimer(actions)
  counter.distance = req.body.allTime
  counter.time = req.body.allTime / velocity
  if (connections.length !== 0) {
    for (let i = 0; i < connections.length; i++) {
      connections[i].sseSend(counter)
    }
  }
  res.status(200).end()
})

app.get('/connect', (req, res) => {
  SerialPort.list((err, ports) => {
    ports.forEach(port => {
      if (port.manufacturer.includes('Arduino')) {
        serialPort = new SerialPort(port.comName, {
          baudRate: 9600,
          // bufferSize: 131072,
          parser: SerialPort.parsers.readline('\n'),
        })
        serialPort.on('open', () => {
          res.send({
            message: 'opened',
          }).end()
          console.log('opened')
        })

        // let counterForLog = 0
        serialPort.on('data', (data) => {
          console.log(`data ${data}`)
        })
      }
    })
  })
})

const server = http.createServer(app)
server.listen(process.env.PORT || 3333, function onListen() {
    const address = server.address()
    console.log('Listening on: %j', address)
    console.log(' -> that probably means: http://localhost:%d', address.port)
})
