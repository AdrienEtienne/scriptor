var text = require('../../../../src/text')
const {
  WORKER_1,
  WORKER_1_DESC,
  WORKER_2,
  WORKER_2_DESC
} = text

module.exports = {
  'registry count is good': function (browser) {
    var registry = browser.page.registry()
    registry.navigate()

    registry
      .expect.element('@titleBadge')
      .text.to.equals(2)
  },
  '2 lines have to be displayed': function (browser) {
    var registry = browser.page.registry()
    registry.expect.element(registry.getLine(1))
      .text.to.equals(`${WORKER_1} ${WORKER_1_DESC} 2`)
    registry.expect.element(registry.getLine(2))
      .text.to.equals(`${WORKER_2} ${WORKER_2_DESC} 1`)
  },
  after: function (browser) {
    browser
      .end()
  }
}
