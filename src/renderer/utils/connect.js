module.exports.verifyUserRoom = function (peerConnection, room, cb) {
  peerConnection.getRemoteConfig(function (err, config) {
    if (err) return cb(err)
    peerConnection.verifyRoom(room, function (err) {
      cb(err, room, config)
    })
  })
}

module.exports.remote = function (peerConnection, config, room) {
  peerConnection.remotePeer(config, room, function (err, peer) {
    if (err) return
    if (!room) return
    peer.on('stream', function (stream) { renderStreams(peerConnection, stream) })

    peer.on('signal', function (sdp) {
      peerConnection.handleSignal(sdp, peer, true, room, function (err) {
        if (err) {
          return
        }
        console.log('SDP POST DONE')
      })
    })

    if (peer.connected) peerConnection.onConnect(peer, true)
    else peer.on('connect', function () { peerConnection.onConnect(peer, true) })
  })
}

module.exports.host = function (peerConnection, opts) {
  if (!opts) opts = {}
  getARoom(peerConnection, function (err, room, config) {
    if (err) return
    opts.room = room
    opts.config = config

    // 向主窗口发送房间名
    const electron = require('electron')
    const mainWindowId = electron.remote.getGlobal('mainWindowId')
    electron.ipcRenderer.sendTo(mainWindowId, 'sendEvent', room)

    peerConnection.hostPeer(opts, function (err, peer) {
      if (err) {
        console.log(err)
        return
      }
      if (!room) {
        return
      }

      peer.on('stream', function (stream) { renderStreams(peerConnection, stream) })

      peer.on('signal', function (sdp) {
        peerConnection.handleSignal(sdp, peer, false, room, function (err) {
          if (err) {
            console.log(peer)
          }
        })
      })
      if (peer) peerConnection.onConnect(peer, false)
      else peer.on('connect', function () { peerConnection.onConnect(peer, false) })
    })
  })
}

function renderStreams (peerConnection, stream) {
  stream.getAudioTracks().forEach(function each (track) {
    var audio = peerConnection.audioElement(stream)
    console.log(audio)
  })
  stream.getVideoTracks().forEach(function each (track) {
    var video = peerConnection.videoElement(stream)
    console.log(video)
  })
}

function getARoom (peerConnection, cb) {
  peerConnection.getRemoteConfig(function (err, config) {
    if (err) return cb(err)
    peerConnection.createRoom(function (err, room) {
      cb(err, room, config)
    })
  })
}
