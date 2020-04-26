if (typeof window !== 'undefined') {
  module.exports = require('./client').default
} else {
  module.exports = require('./server').default
}
