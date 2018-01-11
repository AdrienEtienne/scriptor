<template>
  <div>
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
    ...mapGetters(['getTaskByName', 'getWorkerByName']),
    worker () {
      return this.getWorkerByName(this.$route.params.worker)
    },
    task () {
      return this.getTaskByName(
        this.$route.params.worker,
        this.$route.params.task)
    }
  }
}
</script>
