module.exports = {
  selector: '.modal-content',
  elements: {
    body: '.modal-body',
    btOk: '.modal-footer .btn-primary',
    btCancel: '.modal-footer .btn-secondary'
  },
  commands: [{
    ok () {
      return this
        .click('@btOk')
    },
    cancel () {
      return this
        .click('@btCancel')
        .waitForElementNotVisible('@body')
    }
  }]
}
