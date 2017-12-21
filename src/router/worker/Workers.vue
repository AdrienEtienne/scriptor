<template>
  <div>
    <h1>Workers <b-badge pill variant="warning">{{workers.length}}</b-badge></h1>
    <workers :workers="workers"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Workers from '@/components/Workers'

export default {
  components: {
    'workers': Workers
  },
  computed: {
    ...mapGetters({
      workers: 'workers'
    })
  }
}
</script>
