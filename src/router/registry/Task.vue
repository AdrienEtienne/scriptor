<template>
  <div v-if="task">
    <h3>
      <router-link :to="{ name: 'worker', params: { worker: worker.name }}">
        <entity
          type="worker"
          :name="worker.name"
          :description="worker.description"/>
      </router-link>
      can
      <entity
        v-if="task"
        type="task"
        :name="task.name"
        :description="task.description"/>
      with
      <span v-if="task.needs.length === 0">Nothing</span>
      <entity
        v-bind:key="key"
        v-for="(need, key) in task.needs"
        type="need"
        :name="need.name"
        :description="need.description"/>
    </h3>
    <br />
    <router-view/>
    <json-tree
      v-if="registryTask"
      :data="registryTask"
      rootObjectKey="task"
      maxDepth="3"></json-tree>
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
    ...mapGetters(['task', 'worker', 'registryWorkers']),
    registryTask: function () {
      let task = null
      const worker = this.registryWorkers
        .find(el => el.name === this.worker.name)
      if (worker) {
        task = worker.tasks.find(el2 => el2.name === this.task.name)
      }

      return task
    }
  },
  methods: {
    ...mapActions(['query'])
  },
  created () {
    this.query({
      workerName: this.$route.params.worker,
      taskName: this.$route.params.task
    })
    if (!this.task) this.$router.push('/notFound')
  }
}
</script>

<style scoped>
</style>
