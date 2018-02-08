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
      .text.to.equals(`IT Guy A serial coder 2`)
    registry.expect.element(registry.getLine(2))
      .text.to.equals('HR Collector Always looking for a full package 1')
  },
  after: function (browser) {
    browser
      .end()
  }
}
