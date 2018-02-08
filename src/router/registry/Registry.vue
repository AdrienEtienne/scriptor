<template>
  <div>
    <h1>
      <router-link to="/registry">{{title}}</router-link> <small class="text-muted">{{description}}</small>
    </h1>
    <hr />
    <router-view />
  </div>
</template>

<script>
import text from '@/text.js'

export default {
  data () {
    return {
      title: text.REGISTRY,
      description: text.REGISTRY_DESC
    }
  }
}
</script>

<style scoped>
</style>
