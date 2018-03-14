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
    ...mapGetters(['task', 'worker'])
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
