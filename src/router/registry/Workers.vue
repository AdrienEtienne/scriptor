<template>
  <div>
    <h3>Workers <b-badge pill variant="warning">{{workers.length}}</b-badge></h3>
    <workers :workers="workers"/>
    <json-tree :data="registryWorkers" rootObjectKey="workers" maxDepth="2"></json-tree>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import JsonTree from '@/components/JsonTree'
import Workers from '@/components/Workers'

export default {
  components: {
    JsonTree,
    Workers
  },
  computed: {
    ...mapGetters(['workers', 'registryWorkers'])
  },
  methods: {
    ...mapActions(['query'])
  },
  created () {
    this.query()
  }
}
</script>

<style scoped>
</style>
