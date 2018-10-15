<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to your new project!
        </span>
        <system-information></system-information>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            electron-vue comes packed with detailed documentation that covers everything from
            internal configurations, using the project structure, building your application,
            and so much more.
          </p>
          <div class="flex">
            <button @click="openWindow">Open Window</button>
            <div class="flex-center">
              <input class="flex-input" style="marginTop: 1rem;marginRight: 1rem" type="text" v-model="roomname">
              <button @click="copy">Copy</button>
            </div>
          </div>
          <div class="flex">
            <div>
              <input class="flex-input" type="text" v-model="content" placeholder="Please enter connect room name.">
            </div>
            <button @click="connectWindow">Connect Window</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import InitShareWindow from '../utils/init.js'
  const ipcRenderer = require('electron').ipcRenderer
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data () {
      return {
        content: ''
      }
    },
    computed: {
      roomname () {
        return 'room name:' + this.$store.state.roomname
      }
    },
    mounted () {
      ipcRenderer.on('sendEvent', (evt, arg) => {
        this.$store.commit('updateRoomName', arg)
      })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      openWindow () {
        ipcRenderer.send('openWindow')
      },
      copy () {
        const { clipboard } = require('electron')
        clipboard.writeText(this.roomname.split(':')[1])
      },
      connectWindow () {
        new InitShareWindow().connect(this.content)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .flex-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .flex {
    padding-bottom: 1rem;
  }

  .flex-span {
    margin-left: 1rem;
    font-size: 1.3rem;
  }

  .flex-input {
    width: 80%;
    height: 35px;
    padding: 5px 10px;
    border: none;
    margin-bottom: 1rem;
    border-radius: 5px;
    font-size: 14px;
  }
</style>
