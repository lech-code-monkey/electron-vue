import { app, ipcMain, BrowserWindow } from 'electron'
import MainWindow from './module/MainWindow.js'
import SysTray from './module/SysTray.js'

function APP () {
  this.mainWindow = null
  this.rangeWindow = null
  this.ready = false
  this.shouldQuit = false
  this.sysTray = new SysTray({
    showMainWindow: this.showMainWindow.bind(this)
  })
}

APP.prototype.init = function () {
  this.initApp()
  this.initIPC()
}

APP.prototype.initApp = function () {
  let $this = this
  app.on('ready', function () {
    $this.ready = true
    $this.createMainWindow()

    // 监听close事件，进行隐藏/销毁
    $this.mainWindow.getWinInstance().on('close', (e) => {
      if ($this.shouldQuit) $this.mainWindow.destroy()
      else {
        e.preventDefault()
        $this.mainWindow.hide()
      }
    })
    $this.sysTray.create(`${__static}/img/logo.png`, '测试项目')
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    if (!$this.mainWindow) {
      $this.createMainWindow()
    } else {
      if (!$this.ready) return false
      $this.mainWindow.show()
    }
  })
}

APP.prototype.initIPC = function () {
  let $this = this
  ipcMain.on('quitApp', function (evt, arg) {
    $this.closeAllWindows()
    app.quit()
  })

  ipcMain.on('onMax', function (evt, arg) {
    $this.mainWindow.maximize()
  })

  ipcMain.on('onMinimize', function (evt, arg) {
    $this.mainWindow.minimize()
  })

  ipcMain.on('onRestore', function (evt, arg) {
    $this.mainWindow.restore()
  })

  ipcMain.on('openWindow', function (evt, arg) {
    if ($this.rangeWindow) {
      $this.rangeWindow.show()
      return
    }
    $this.rangeWindow = new BrowserWindow({
      width: 1300,
      height: 820,
      parent: $this.mainWindow
    })
    const winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/#/rangewindow`
      : `file://${__dirname}/index.html#rangewindow`
    $this.rangeWindow.loadURL(winURL)
    $this.rangeWindow.on('closed', () => { $this.rangeWindow = null })
  })
}

APP.prototype.createMainWindow = function () {
  if (!this.ready) return false
  this.mainWindow = new MainWindow()
  global.mainWindowId = this.mainWindow.getId()
}

APP.prototype.closeAllWindows = function () {
  let $windows = BrowserWindow.getAllWindows()
  for (let i = $windows.length; i--;) {
    $windows[i].destroy()
  }
  this.sysTray.destroy()
}

APP.prototype.showMainWindow = function () {
  if (this.mainWindow) this.mainWindow.show()
}

export default APP
