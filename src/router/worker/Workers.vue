<template>
  <div>
    <b-jumbotron :header="registryText" :lead="registryDescText" >
      <hr/>
      <p>{{sandboxDescText}}</p>
      <b-button to="sandbox" variant="primary">{{sandboxText}}</b-button>
    </b-jumbotron>
    <h1>Workers <b-badge pill variant="warning">{{workers.length}}</b-badge></h1>
    <workers :workers="workers"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Workers from '@/components/Workers'
import text from '@/text.js'

export default {
  components: {
    Workers
  },
  computed: {
    ...mapGetters(['workers'])
  },
  data () {
    return {
      registryText: text.REGISTRY,
      registryDescText: text.REGISTRY_DESC,
      sandboxText: text.SANDBOX,
      sandboxDescText: text.SANDBOX_DESC_2
    }
  }
}
</script>
