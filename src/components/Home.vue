<template>
  <div>
    <b-jumbotron header="Scriptor" lead="A user friendly way to write scripts" bg-variant="dark" text-variant="light" border-variant="dark">
      <hr/>
      <p>{{sandboxDescText}}</p>
      <b-btn variant="light" to="workers">{{sandboxText}}</b-btn>
      <hr/>
      <p>{{registryDescText}}</p>
      <b-btn variant="light" to="workers">{{registryText}}</b-btn>
    </b-jumbotron>
    <b-row>
      <b-col v-for="(el, key) in els" :key="key">
        <b-card
          :title="el.title">
        <p>{{el.description}}</p>
        What it looks like
        <entity
          :type="el.entityType"
          :name="el.entityName"
          :description="el.entityDescription"/>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import text from '@/text'
import Entity from '@/components/Entity'
export default {
  name: 'Home',
  components: {
    Entity
  },
  data () {
    return {
      sandboxText: text.SANDBOX,
      sandboxDescText: text.SANDBOX_DESC_2,
      registryText: text.REGISTRY,
      registryDescText: text.REGISTRY_DESC_2,
      els: [{
        title: 'Worker',
        description: 'Can execute many tasks',
        entityType: 'worker',
        entityName: 'Worker name',
        entityDescription: 'Description of the worker'
      }, {
        title: 'Task',
        description: 'A work to do by a Worker',
        entityType: 'task',
        entityName: 'Task name',
        entityDescription: 'Description of the task'
      }, {
        title: 'Need',
        description: 'A require thing for a Task',
        entityType: 'need',
        entityName: 'Need name',
        entityDescription: 'Description of the need'
      }]
    }
  }
}
</script>
