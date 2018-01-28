<template>
  <b-badge :variant="variant" v-b-tooltip.hover :title="description">{{name}}</b-badge>
</template>

<script>
export default {
  name: 'Entity',
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    variant () {
      let variant = 'dark'
      if (this.type === 'worker') variant = 'warning'
      if (this.type === 'task') variant = 'primary'
      if (this.type === 'instance') variant = 'secondary'
      return variant
    }
  }
}
</script>

<style scoped>
.badge {
  margin: 0 5px 0 0;
}
</style>
