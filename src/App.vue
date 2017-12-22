<template>
  <div id="app">
    <b-navbar type="light" variant="light">
      <b-container>
        <b-navbar-brand to="/">Scriptor</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item to="/workers">Workers</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <br/>
    <b-container>
      <router-view/>
    </b-container>
    <footer-app/>
  </div>
</template>

<script>
import FooterApp from './components/FooterApp'
export default {
  name: 'app',
  components: {
    'footerApp': FooterApp
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
