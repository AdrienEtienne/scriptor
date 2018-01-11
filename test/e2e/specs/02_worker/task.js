var text = require('../../../../src/text')
const {
  WORKER_1,
  TASK_2,
  NEED_1,
  NEED_1_DESC
} = text

module.exports = {
  before: function (browser) {
    var registry = browser.page.registry()
    registry.navigate()
    registry.clickLinkLine(1)
    var worker = browser.page.worker()
    worker.clickLinkLine(2)
  },
  'task name': function (browser) {
    var worker = browser.page.worker()
    worker
      .expect.element('@title')
      .text.to.equals(`${WORKER_1} can ${TASK_2} with ${NEED_1}`)
  },
  'needs line is well displayed': function (browser) {
    var worker = browser.page.worker()
    worker.expect.element(worker.getLine(1))
      .text.to.equals(`${NEED_1} ${NEED_1_DESC} ${WORKER_1}`)
  },
  after: function (browser) {
    browser
      .end()
  }
}
