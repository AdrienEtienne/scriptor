var tableCmds = require('../commands/table')

module.exports = {
  url: function () {
    return this.api.launchUrl + 'registry'
  },
  elements: {
    title: 'h3',
    titleBadge: 'h3 span'
  },
  commands: [
    tableCmds
  ]
}
