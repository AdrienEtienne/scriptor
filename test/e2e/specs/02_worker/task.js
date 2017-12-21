var text = require('../../../../src/text')
const {
  WORKER_1,
  TASK_2,
  NEED_1,
  NEED_1_DESC
} = text

module.exports = {
  before: function (browser) {
    var workers = browser.page.workers()
    workers.navigate()
    workers.clickLinkLine(1)
    var worker = browser.page.worker()
    worker.clickLinkLine(2)
  },
  'task name': function (browser) {
    var task = browser.page.task()
    task
      .expect.element('@title')
      .text.to.equals(TASK_2)
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
