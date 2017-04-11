import express from 'express'

const router = express.Router()

const webpack = require('webpack')
const webpackConfig = require('../../webpack/common.config')

const compiler = webpack(webpackConfig)
router.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}))
router.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}))

export default router
