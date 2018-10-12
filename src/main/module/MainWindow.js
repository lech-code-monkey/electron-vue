import { BrowserWindow } from 'electron'

var MainWindow = function () {
  MainWindow.prototype.init()
}

MainWindow.prototype.getWinInstance = function () {
  return this.mainWindow
}

MainWindow.prototype.init = function () {
  this.options = {
    width: 886,
    height: 586,
    minWidth: 886,
    minHeight: 500
  }
  this.createWindow()
}

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

MainWindow.prototype.createWindow = function () {
  this.mainWindow = new BrowserWindow(this.options)
  this.mainWindow.loadURL(winURL)
  let $this = this
  this.mainWindow.on('ready-to-show', function () {
    $this.mainWindow.show()
  })
}

MainWindow.prototype.show = function () {
  this.mainWindow.show()
}

MainWindow.prototype.hide = function () {
  this.mainWindow.hide()
}

MainWindow.prototype.destroy = function () {
  this.mainWindow = null
}

MainWindow.prototype.maximize = function () {
  this.mainWindow.maximize()
}

MainWindow.prototype.minimize = function () {
  this.mainWindow.minimize()
}

MainWindow.prototype.restore = function () {
  this.mainWindow.restore()
}

export default MainWindow
