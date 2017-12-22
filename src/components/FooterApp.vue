<template>
  <footer class="bg-light">
    <div class="part text-light bg-dark">
      This project has a
      <img src="../assets/github.png" />
      <a variant="link" href="https://github.com/AdrienEtienne/scriptor" target="_blank">Github</a>
    </div>
    <div class="part">
      Developped with
      <img src="../assets/vue.png" />
      <a variant="link" href="https://vuejs.org/" target="_blank">Vue.js</a>
    </div>
    <div class="part text-light bootstrap">
      Stylized with :
      <img src="../assets/bootstrap.png" />
      <a variant="link" href="http://getbootstrap.com/" target="_blank">Bootstrap V4</a> +
      <img src="../assets/bootstrap-vue.png" />
      <a variant="link" href="https://bootstrap-vue.js.org/" target="_blank">Bootstrap Vue</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterApp'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  margin-top: 40px;
}
footer > .part {
  padding: 10px 0;
  text-align: center;
}
.bootstrap {
  background-color: #563d7c;
}
img {
  width: 50px;
  height: 50px;
}
</style>
