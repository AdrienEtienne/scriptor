<template>
  <div>
    <h4>Needs <b-badge pill variant="dark">{{needs.length}}</b-badge></h4>
    <needs :needs="needs"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Needs from '@/components/Needs'

export default {
  components: {
    Needs
  },
  computed: {
    ...mapGetters(['needs'])
  }
}
</script>

<style scoped>
</style>
