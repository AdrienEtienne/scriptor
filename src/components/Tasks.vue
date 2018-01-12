<template>
  <b-table :items="tasks" :fields="fields">
    <template slot="name" slot-scope="data">
      <router-link :to="{ name: 'task', params: { task: data.item.name }}">
        <entity :name="data.item.name" :description="data.item.description" type="task"/>
      </router-link>
    </template>
    <template slot="description" slot-scope="data">
      {{data.item.description}}
    </template>
    <template slot="needs" slot-scope="data">
      <b-badge variant="dark" pill>{{(data.item.needs || []).length}}</b-badge>
    </template>
  </b-table>
</template>

<script>
import Entity from '@/components/Entity'
export default {
  name: 'Tasks',
  components: {
    Entity
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' },
        { key: 'needs', label: 'Needs' }
      ]
    }
  }
}
</script>
