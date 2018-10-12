import { Menu, Tray } from 'electron'

function SysTray (opts) {
  this.opts = opts
  this.tray = null
  var template = [
    {
      label: '关于'
    },
    {
      role: 'quit',
      label: '退出'
    }
  ]

  this.template = Menu.buildFromTemplate(template)
  this.aboutItem = this.template.items[0]

  this.aboutItem.click = () => {
    opts.showAboutWindow && opts.showAboutWindow()
  }
}

SysTray.prototype = {
  create: function (icon, tip) {
    if (this.tray) return
    let $this = this
    this.tray = new Tray(icon)
    this.tray.setToolTip(tip)
    this.tray.on('click', () => {
      $this.opts.showMainWindow && $this.opts.showMainWindow()
    })
    if (process.platform === 'win32') {
      this.tray.on('right-click', () => {
        $this.tray.popUpContextMenu($this.template)
      })
    }
  },
  destroy: function () {
    if (this.tray) {
      this.tray.destroy()
      this.tray = null
    }
  }
}

export default SysTray
