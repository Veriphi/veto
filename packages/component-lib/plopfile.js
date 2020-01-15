const inquirerDirectory = require('inquirer-directory')

const newComponentGenerator = require('./generators/NewComponent')

module.exports = (plop) => {
  // Add Plugins
  plop.addPrompt('directory', inquirerDirectory)

  // List generators
  newComponentGenerator(plop)
}
