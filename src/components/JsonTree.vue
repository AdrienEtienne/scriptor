<template>
  <div v-if="data">
    <h3>Json</h3>
    <b-alert show variant="info">
      <tree-view
        :data="JSON.parse(JSON.stringify(data))"
        :options="{ maxDepth: maxDepth || 666, rootObjectKey: rootObjectKey }">
      </tree-view>
    </b-alert>
  </div>
</template>

<script>
export default {
  props: ['data', 'rootObjectKey', 'maxDepth']
}
</script>

<style scoped>
</style>
