var text = require('../../../../src/text')
const {
  WORKER_1,
  WORKER_1_DESC,
  WORKER_2,
  WORKER_2_DESC
} = text

module.exports = {
  'workers count is good': function (browser) {
    var workers = browser.page.workers()
    workers.navigate()

    workers
      .expect.element('@titleBadge')
      .text.to.equals(2)
  },
  '2 lines have to be displayed': function (browser) {
    var workers = browser.page.workers()
    workers.expect.element(workers.getLine(1))
      .text.to.equals(`${WORKER_1} ${WORKER_1_DESC} 2`)
    workers.expect.element(workers.getLine(2))
      .text.to.equals(`${WORKER_2} ${WORKER_2_DESC} 1`)
  },
  after: function (browser) {
    browser
      .end()
  }
}
