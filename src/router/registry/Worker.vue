<template>
  <div>
    <h3>
      <entity type="worker" :name="worker.name" :description="worker.description"/>
    </h3>
    <br />
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Entity from '@/components/Entity'

export default {
  components: {
    Entity
  },
  computed: {
    ...mapGetters(['worker'])
  },
  methods: {
    ...mapActions(['query'])
  },
  created () {
    const workerName = this.$route.params.worker
    this.query({ workerName })
  }
}
</script>

<style scoped>
</style>
