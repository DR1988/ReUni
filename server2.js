const http = require('http')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const SerialPort = require('serialport')

const app = express()

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

const counter = { counts: 0, val: 0 }
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

  // console.log(action)
  // if (connections.length !== 0) {
  //   for (let i = 0; i < connections.length; i++) {
  //     connections[i].sseSend(counter)
  //   }
  // }

  if (!action.done) {
    counter.counts += action.value.duration
    counter.val = action.value.duration
    // console.log(action.value.value)
    serialPort.write(`${action.value.value}\n`)
    setTimeout(() => {
      setValuesTimer(actions)
      if (connections.length !== 0) {
        for (let i = 0; i < connections.length; i++) {
          connections[i].sseSend(counter)
        }
      }
    }, action.value.duration * 10)
  } else {
    serialPort.write(`${0}\n`)
    // console.log('done')
  }
}

app.post('/start', (req, res) => {
  const arrOfActions = req.body.lineFormer[8].changes
  const DTO = []
  const lastActions = arrOfActions.reduce((acc, curr) => {
    const gaps = { value: 0, duration: curr.startTime - acc.endTime }
    DTO.push(acc, gaps)
    return curr
  })
  DTO.push(lastActions)
  const actions = DTO[Symbol.iterator]()


  // setInterval(() => {
  //   counter.counts += 100
  //   if (connections.length !== 0) {
  //     for (let i = 0; i < connections.length; i++) {
  //       connections[i].sseSend(counter)
  //     }
  //   }
  // }, 10000)

  setValuesTimer(actions)

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
