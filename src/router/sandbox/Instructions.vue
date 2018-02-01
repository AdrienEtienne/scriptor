<template>
  <b-list-group id="instructions">
    <b-list-group-item v-for="(item, key) in instructions" :key="key">
      <call-task
        v-if="item.type === 'CALL_TASK'"
        :instance="item.instance"
        :task="item.task"
        :needs="item.needs"/>
      <create-instance
        v-if="item.type === 'CREATE_INSTANCE'"
        :instance="item.instance"/>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import { mapGetters } from 'vuex'
import instruction from '@/components/instruction'

export default {
  name: 'Instructions',
  components: {
    ...instruction
  },
  computed: {
    ...mapGetters(['instructions'])
  }
}
</script>

<style scoped>
</style>
