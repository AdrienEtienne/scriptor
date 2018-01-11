var text = require('../../../../src/text')
const {
  WORKER_1,
  TASK_1,
  TASK_1_DESC,
  TASK_2,
  TASK_2_DESC
} = text

module.exports = {
  before: function (browser) {
    var registry = browser.page.registry()
    registry.navigate()
    registry.clickLinkLine(1)
  },
  'worker name': function (browser) {
    var worker = browser.page.worker()
    worker
      .expect.element('@title')
      .text.to.equals(WORKER_1)
  },
  'tasks line is well displayed': function (browser) {
    var worker = browser.page.worker()
    worker.expect.element(worker.getLine(1))
      .text.to.equals(`${TASK_1} ${TASK_1_DESC} 0`)
    worker.expect.element(worker.getLine(2))
      .text.to.equals(`${TASK_2} ${TASK_2_DESC} 1`)
  },
  after: function (browser) {
    browser
      .end()
  }
}
