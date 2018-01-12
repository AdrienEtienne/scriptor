<template>
  <div>
    <h1>
      <router-link to="/sandbox">{{title}}</router-link> <small class="text-muted">{{description}}</small>
    </h1>
    <hr />
  </div>
</template>

<script>
import text from '@/text.js'

export default {
  name: 'Sandbox',
  data () {
    return {
      title: text.SANDBOX,
      description: text.SANDBOX_DESC
    }
  }
}
</script>
