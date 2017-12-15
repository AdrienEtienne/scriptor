<template>
  <footer class="footer">
    <div class="text-light bootstrap">
      <div class="container text-center">
        <h4>
          <img width="75" height="75" src="../assets/bootstrap-stack.png" />
          Powered by <a variant="link" href="http://getbootstrap.com/" target="_blank">Bootstrap V4</a>
        </h4>
        
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  margin-top: 40px;
}
.footer .bootstrap {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #563d7c;
}
</style>
