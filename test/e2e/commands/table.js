module.exports = {
  getLine (num) {
    return 'tbody tr:nth-child(' + num + ')'
  },
  clickLinkLine (num) {
    const selector = this.getLine(num) + ' a'
    this.click(selector)
  }
}
