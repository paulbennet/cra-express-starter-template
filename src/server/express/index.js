const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const http = require('http')
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const serverDestroy = require('server-destroy')
const nocache = require('nocache')

const PACKAGE_INFO = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')))
const PORT = PACKAGE_INFO.serverConfig.port

const PID_FILENAME = `.server_instance_${PORT}.pid`

let server = null

const killServer = function () {
  try {
    server.destroy()
  } catch (err) {
  }

  try {
    let processID = fs.readFileSync(path.resolve(path.join(__dirname, PID_FILENAME)))

    processID = processID.toString()

    if (process.platform === 'win32') {
      execSync(`taskkill /F /PID ${processID}`, {
        stdio: 'ignore'
      })
    } else {
      execSync(`kill ${processID}`, {
        stdio: 'ignore'
      })
    }

    fs.unlinkSync(path.resolve(path.join(__dirname, PID_FILENAME)))
  } catch (err) {
  }

  server = null
}

const mainProcess = () => {
  killServer()

  if (process.argv[2] === '--kill') {
    return
  }

  const app = express()

  app.use(compression())
  app.use(cors())

  app.use(express.json())

  // NOTE: In dev mode we use the CRA client proxy setup
  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.resolve(path.join(__dirname, '../../client/build/'))))
  }

  // Define apis/paths here
  app.get('/api/sample', nocache(), require('./api-sample.js'))

  server = http.createServer(app)

  server.listen(PORT, () => {
    console.log('[log] App started in port ', PORT)
    console.log('[log] You can now access the app @ ', `http://localhost:${PORT}/app/`)
  })

  serverDestroy(server)

  fs.writeFileSync(path.resolve(path.join(__dirname, PID_FILENAME)), String(process.pid))

  process.on('SIGINT', killServer)
  process.on('SIGTERM', killServer)
}

mainProcess()
