<template>
  <b-table :items="needs" :fields="fields">
    <template slot="name" slot-scope="data">
      <entity type="need" :name="data.item.name" :description="data.item.description"/>
    </template>
    <template slot="description" slot-scope="data">{{data.item.description}}</template>
    <template slot="worker" slot-scope="data">
      <router-link :to="{ name: 'worker', params: { worker: data.item.worker.name }}">
        <entity type="worker" :name="data.item.worker.name" :description="data.item.worker.description"/>
      </router-link>
    </template>
  </b-table>
</template>

<script>
import Entity from '@/components/Entity'
export default {
  components: {
    Entity
  },
  props: {
    needs: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'worker', label: 'Is Worker' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
