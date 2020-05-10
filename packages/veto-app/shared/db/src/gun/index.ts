declare const __webpack_require__: void

// if running in Webpack, take the client
if (typeof __webpack_require__ === 'function') {
  module.exports = require('./client').default
} else {
  module.exports = require('./server').default
}
