import { desktopCapturer } from 'electron'
import createPeerConnection from './peer'
import connect from './connect'

const peerConnection = createPeerConnection()
var InitShareWindow = function () {
  this.peer = null
}

InitShareWindow.prototype.create = function () {
  // 创建分享界面
  let $this = this
  desktopCapturer.getSources({types: ['screen']}, (err, sources) => {
    if (err) return $this.error(err)
    if (sources[0].name === 'Entire screen') {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[0].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }).then((stream) => {
        // 窗口展示
        const video = document.querySelector('video')
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
        $this.share(sources[0].id)
      }).catch((e) => $this.error(e))
    }
  })
}

InitShareWindow.prototype.share = function (sourcesId) {
  //  分享桌面
  const opts = {
    constraints: {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourcesId,
          maxWidth: screen.availWidth,
          maxHeight: screen.availHeight,
          maxFrameRate: 25
        }
      }
    }
  }
  peerConnection.on('connected', (newPeer, remote) => {
    this.peer = newPeer
    console.log(this.perr)
  })
  connect.host(peerConnection, opts)
}

InitShareWindow.prototype.connect = function (room) {
  // 连接分享窗口
  connect.verifyUserRoom(peerConnection, room, (err, room, config) => {
    if (err) {
      this.error('Error! ' + err.message)
      return
    }
    console.log(config)
    // connect.remote(peerConnection, config.config, config.room)
  })
}

InitShareWindow.prototype.error = function (e) {
  // 错误日志
  console.log(e)
}

export default InitShareWindow
