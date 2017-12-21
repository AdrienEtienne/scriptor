<template>
  <div>
    <h1>
      <entity type="worker" :name="worker.name" :description="worker.description"/> <small>worker</small>
    </h1>
    <p>{{worker.description}}</p>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Entity from '@/components/Entity'

export default {
  components: {
    'entity': Entity
  },
  computed: {
    ...mapGetters(['getWorkerByName']),
    worker () {
      return this.getWorkerByName(this.$route.params.worker)
    }
  }
}
</script>

<style scoped>
</style>
