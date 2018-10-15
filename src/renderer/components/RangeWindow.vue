<template>
  <div>
    <h1>测试界面</h1>
    <video></video>
  </div>
</template>

<script>
import InitShareWindow from '../utils/init.js'
export default {
  name: 'range-window',
  mounted () {
    new InitShareWindow().create()
  }
}
</script>
