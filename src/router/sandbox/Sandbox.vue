<template>
  <div>
    <b-jumbotron :header="sandboxText" :lead="sandboxDescText" >
      <hr/>
      <p>{{registryDescText}}</p>
      <b-button to="workers" variant="primary">{{registryText}}</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import text from '@/text.js'

export default {
  name: 'Sandbox',
  data () {
    return {
      registryText: text.REGISTRY,
      registryDescText: text.REGISTRY_DESC_2,
      sandboxText: text.SANDBOX,
      sandboxDescText: text.SANDBOX_DESC
    }
  }
}
</script>
