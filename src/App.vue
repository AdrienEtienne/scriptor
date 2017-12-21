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
    <footer class="bg-light">
      <footer-vue/>
      <footer-bootstrap/>
    </footer>
  </div>
</template>

<script>
import FooterBootstrap from './components/FooterBootstrap'
import FooterVue from './components/FooterVue'
export default {
  name: 'app',
  components: {
    'footerBootstrap': FooterBootstrap,
    'footerVue': FooterVue
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
footer {
  margin-top: 40px;
}
</style>
