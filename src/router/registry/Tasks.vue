<template>
  <div>
    <h4>Tasks <b-badge pill variant="primary">{{tasks.length}}</b-badge></h4>
    <tasks :tasks="tasks"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tasks from '@/components/Tasks'

export default {
  components: {
    Tasks
  },
  computed: {
    ...mapGetters(['tasks'])
  }
}
</script>

<style scoped>
</style>
