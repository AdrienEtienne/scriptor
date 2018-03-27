/* eslint-disable no-unused-expressions */

module.exports = {
  before: function (browser) {
    var sandbox = browser.page.sandbox()
    sandbox.navigate()
  },
  'create an instance': function (browser) {
    var sandbox = browser.page.sandbox()
    var createInstance = sandbox.section.createInstance

    sandbox.addInstruction('@btCreateInstance')
    sandbox.expect.section('@createInstance').to.be.visible

    createInstance.section.modal.ok()
    createInstance.expect.element('@inputNameInvalidFeedback')
      .text.to.equal('does not meet minimum length of 1')

    createInstance.setValue('@inputName', 'myInstance')
    createInstance.section.modal.ok()
    createInstance.expect.element('@selectWorkerInvalidFeedback')
      .text.to.equal('Worker does not exist')

    createInstance
      .selectByLabel(createInstance.elements.selectWorker.selector, 'IT Guy')

    createInstance.section.modal.ok()
    sandbox.expect.section('@createInstance').to.not.be.visible

    sandbox.line(6).text.to.equal('Declare myInstance as a new IT Guy')
  },
  'call a task': function (browser) {
    var sandbox = browser.page.sandbox()

    sandbox.addInstruction('@btCallTask')
    sandbox.expect.section('@callTask').to.be.visible
    sandbox
      .section.callTask
      .section.modal.cancel()
    sandbox.expect.section('@callTask').to.not.be.visible
  },
  after: function (browser) {
    browser.end()
  }
}
