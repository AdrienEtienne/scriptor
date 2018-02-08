<template>
  <div>
    <span>Declare</span>
    <entity :name="instance.name" type="instance"/>
    <span>as a new</span>
    <entity :name="worker.name" :description="worker.description" type="worker"/>
  </div>
</template>

<script>
import Entity from '../Entity'

export default {
  name: 'CreateInstance',
  components: {
    Entity
  },
  props: {
    instance: {
      type: Object,
      required: true
    }
  },
  computed: {
    worker () {
      return this.instance.worker
    }
  }
}
</script>

<style scoped>
</style>
