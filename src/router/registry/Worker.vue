<template>
  <div v-if="worker">
    <h3>
      <entity type="worker" :name="worker.name" :description="worker.description"/>
    </h3>
    <br />
    <router-view/>
    <json-tree :data="registryWorker" rootObjectKey="worker" maxDepth="3"></json-tree>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Entity from '@/components/Entity'
import JsonTree from '@/components/JsonTree'

export default {
  components: {
    Entity,
    JsonTree
  },
  computed: {
    ...mapGetters(['worker', 'registryWorkers']),
    registryWorker: function () {
      return this.registryWorkers
        .find(el => el.name === this.worker.name)
    }
  },
  methods: {
    ...mapActions(['query'])
  },
  created () {
    const workerName = this.$route.params.worker
    this.query({ workerName })
    if (!this.worker) this.$router.push('/notFound')
  }
}
</script>

<style scoped>
</style>
