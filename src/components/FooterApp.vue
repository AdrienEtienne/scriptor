<template>
  <footer class="bg-light">
    <b-container>
      <b-row>
        <b-col md="6" class="links" offset-md="2">
            <a variant="link" href="https://github.com/AdrienEtienne/scriptor" target="_blank">
              <img src="../assets/github.png" /> Github
            </a>
            <a variant="link" href="https://vuejs.org/" target="_blank">
              <img src="../assets/vue.png" /> Vue
            </a>
            <a variant="link" href="http://getbootstrap.com/" target="_blank">
              <img src="../assets/bootstrap.png" /> Bootstrap V4
            </a>
            <a variant="link" href="https://bootstrap-vue.js.org/" target="_blank">
              <img src="../assets/bootstrap-vue.png" /> Bootstrap Vue
            </a>
        </b-col>
        <b-col md="4">
            Powered by <a variant="link" href="http://www.heroku.com/" target="_blank"><img src="../assets/heroku.png" /></a>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  margin-top: 40px;
  padding: 20px 0;
  font-size: 12px;
}
.links a {
  display: block;
  margin-bottom: 5px;
}
img {
  height: 25px;
}
</style>
