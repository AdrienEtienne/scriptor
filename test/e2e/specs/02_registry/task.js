module.exports = {
  before: function (browser) {
    var workers = browser.page.workers()
    workers.navigate()
    workers.clickLinkLine(1)
    var worker = browser.page.worker()
    worker.clickLinkLine(2)
  },
  'task name': function (browser) {
    var worker = browser.page.worker()
    worker
      .expect.element('@title')
      .text.to.equals('IT Guy can Code something really great with A developper')
  },
  'needs line is well displayed': function (browser) {
    var worker = browser.page.worker()
    worker.expect.element(worker.getLine(1))
      .text.to.equals('A developper An help because the task cant be done alone IT Guy')
  },
  after: function (browser) {
    browser
      .end()
  }
}
