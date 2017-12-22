<template>
  <b-table :items="workers" :fields="fields">
    <template slot="name" slot-scope="data">
      <router-link :to="{ name: 'worker', params: { worker: data.item.name }}">
        <entity :name="data.item.name" :description="data.item.description" type="worker"/>
      </router-link>
    </template>
    <template slot="description" slot-scope="data">
      {{data.item.description}}
    </template>
    <template slot="tasks" slot-scope="data">
      <b-badge variant="primary" pill>{{data.item.tasks.length}}</b-badge>
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
    workers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'tasks', label: 'Tasks' }
      ]
    }
  }
}
</script>
