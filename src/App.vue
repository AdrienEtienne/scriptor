<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <footer>
      <footer-bootstrap/>
    </footer>
  </div>
</template>

<script>
import FooterBootstrap from './components/FooterBootstrap'
export default {
  name: 'app',
  components: {
    FooterBootstrap
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer {
  margin-top: 40px;
}
</style>
