<template>
  <div>
    <h4>Needs <b-badge pill variant="light">{{needs.length}}</b-badge></h4>
    <needs :needs="needs"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Needs from '@/components/Needs'

export default {
  components: {
    'needs': Needs
  },
  computed: {
    ...mapGetters(['getNeeds', 'getWorkerByName']),
    needs () {
      const needs = []
      const tmp = this.getNeeds(
        this.$route.params.worker,
        this.$route.params.task)
      for (var i = 0; i < tmp.length; i++) {
        needs.push({
          ...tmp[i],
          worker: this.getWorkerByName(tmp[i].worker)
        })
      }
      return needs
    }
  }
}
</script>
