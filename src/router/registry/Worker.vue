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
import { mapGetters } from 'vuex'
import Entity from '@/components/Entity'

export default {
  components: {
    Entity
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
