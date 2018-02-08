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
      .text.to.equals('IT Guy')
  },
  'tasks line is well displayed': function (browser) {
    var worker = browser.page.worker()
    worker.expect.element(worker.getLine(1))
      .text.to.equals('Code something good The man code as usual 0')
    worker.expect.element(worker.getLine(2))
      .text.to.equals(`Code something really great A great development can be done, but he needs help 1`)
  },
  after: function (browser) {
    browser
      .end()
  }
}
