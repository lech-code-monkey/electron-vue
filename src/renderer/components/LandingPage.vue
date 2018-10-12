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
            <button @click="openWindow">Open Window</button><br><br>
          </div>
          <div class="flex">
            <span class="flex-span">{{roomname}}</span>
          </div>
          <div class="flex">
            <button @click="connectWindow">Connect Window</button><br><br>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  // import InitShareWindow from '../utils/init.js'
  export default {
    name: 'landing-page',
    components: { SystemInformation },
    computed: {
      roomname () {
        console.log(this.$store.state)
        return 'room name: ' + this.$store.state.roomname
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      openWindow () {
        const electron = require('electron')
        const ipcRenderer = electron.ipcRenderer
        ipcRenderer.send('openWindow')
      },
      connectWindow () {
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

  .flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 1rem;
  }

  .flex-span {
    margin-left: 1rem;
    font-size: 1.3rem;
  }
</style>
