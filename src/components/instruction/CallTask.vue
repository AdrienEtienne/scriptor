<template>
  <div>
    <entity :name="instance.name" type="instance"/>
    <span>does</span>
    <entity :name="task.name" :description="task.description" type="task"/>
    <span v-if="needs.length>0">
      <span>with</span>
      <entity
        v-for="(need, key) in needs" :key="key"
        :name="need.name"
        :description="need.description"
        type="instance"/>
    </span>
  </div>
</template>

<script>
import Entity from '../Entity'

export default {
  name: 'CallTask',
  components: {
    Entity
  },
  props: {
    instance: {
      type: Object,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    needs: {
      type: Array
    }
  }
}
</script>

<style scoped>
</style>
