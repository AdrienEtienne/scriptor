module.exports = {
  'registry count is good': function (browser) {
    var workers = browser.page.workers()
    workers.navigate()

    workers
      .expect.element('@titleBadge')
      .text.to.equals(2)
  },
  '2 lines have to be displayed': function (browser) {
    var workers = browser.page.workers()
    workers.expect.element(workers.getLine(1))
      .text.to.equals(`IT Guy A serial coder 2`)
    workers.expect.element(workers.getLine(2))
      .text.to.equals('HR Collector Always looking for a full package 1')
  },
  after: function (browser) {
    browser
      .end()
  }
}
