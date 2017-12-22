<template>
  <div id="app">
    <b-navbar type="light" variant="light" toggleable="md">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand to="/">Scriptor</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/sandbox">{{sandboxText}}</b-nav-item>
            <b-nav-item to="/workers">{{registryText}}</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
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
import FooterApp from '@/components/FooterApp'
import text from '@/text'
export default {
  name: 'app',
  components: {
    FooterApp
  },
  data () {
    return {
      registryText: text.REGISTRY,
      sandboxText: text.SANDBOX
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
