<template>
  <div>
    <h3>
      <entity
        v-if="task"
        type="task"
        :name="task.name"
        :description="task.description"/> <small>task</small>
    </h3>
    <p>{{task.description}}</p>
    <p>
      <entity
        type="worker"
        :name="worker.name"
        :description="worker.description"/>
      can
      <entity
        type="task"
        :name="task.name"
        :description="task.description"/>
      using :
      <span v-if="task.needs.length === 0">Nothing</span>
      <entity
        v-bind:key="key"
        v-for="(need, key) in task.needs"
        type="need"
        :name="need.name"
        :description="need.description"/>
    </p>
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
