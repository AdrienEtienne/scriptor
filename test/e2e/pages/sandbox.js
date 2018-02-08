var formCmds = {
  selectByLabel (selector, label) {
    this.click(`${selector} [label="${label}"]`)
    return this
  }
}

module.exports = {
  selector: '#sandbox',
  url: function () {
    return this.api.launchUrl + 'sandbox'
  },
  elements: {
    btAddInstruction: '#ddown-add-instruction > button',
    btCallTask: '#bt-modal-call-task',
    btCreateInstance: '#bt-modal-create-instance'
  },
  sections: {
    createInstance: {
      selector: '#modal-create-instance',
      elements: {
        inputName: '#input-instance-name',
        inputNameInvalidFeedback: '#instance-name-group .invalid-feedback',
        selectWorker: '#input-select-worker',
        selectWorkerInvalidFeedback: '#select-worker-group .invalid-feedback'
      },
      sections: {
        modal: require('./modal')
      },
      commands: [formCmds]
    },
    callTask: {
      selector: '#modal-call-task',
      sections: {
        modal: require('./modal')
      }
    }
  },
  commands: [{
    line (num) {
      return this.expect.element(`.list-group .list-group-item:nth-child(${num})`)
    },
    addInstruction (element) {
      this
        .click('@btAddInstruction')
        .click(element)
      return this
    }
  }
  ]
}
