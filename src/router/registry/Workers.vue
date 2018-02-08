<template>
  <div>
    <h3>Workers <b-badge pill variant="warning">{{workers.length}}</b-badge></h3>
    <workers :workers="workers"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Workers from '@/components/Workers'

export default {
  components: {
    Workers
  },
  computed: {
    ...mapGetters(['workers'])
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
