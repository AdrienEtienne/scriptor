/* eslint-disable no-unused-expressions */

module.exports = {
  'display instructions': function (browser) {
    var sandbox = browser.page.sandbox()
    sandbox.navigate()

    sandbox.line(1).text.to.equal('Declare Adrien as a new IT Guy')
    sandbox.line(2).text.to.equal('Declare John as a new IT Guy')
    sandbox.line(3).text.to.equal('Declare Bill as a new HR Collector')
    sandbox.line(4).text.to.equal('Adrien does Code something really great with John')
    sandbox.line(5).text.to.equal('Bill does Find a developer with AdrienJohn')
  },
  after: function (browser) {
    browser
      .end()
  }
}
