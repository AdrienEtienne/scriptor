// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'favicon is present': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL
    var index = browser.page.index()

    browser
      .url(devServer)

    index
      .expect.element('@favicon')
      .to.have.attribute('href')
      .equals(browser.globals.devServerURL + '/static/favicon.ico')

    browser
      .end()
  }
}
