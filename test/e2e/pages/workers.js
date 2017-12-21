var tableCmds = require('../commands/table')

module.exports = {
  url: function () {
    return this.api.launchUrl + 'workers'
  },
  elements: {
    title: 'h1',
    titleBadge: 'h1 span'
  },
  commands: [
    tableCmds
  ]
}
