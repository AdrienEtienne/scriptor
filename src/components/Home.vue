<template>
  <div>
    <b-jumbotron header="Scriptor" lead="A user friendly way to write scripts" bg-variant="dark" text-variant="light" border-variant="dark">
      <hr/>
      <b-row>
        <b-col>
          <p>{{sandboxDescText}}</p>
          <b-btn variant="light" to="sandbox">{{sandboxText}}</b-btn>
        </b-col>
        <b-col>
          <p>{{registryDescText}}</p>
          <b-btn variant="light" to="registry">{{registryText}}</b-btn>
        </b-col>
      </b-row>
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
  components: {
    Entity
  },
  data () {
    return {
      sandboxText: text.SANDBOX,
      sandboxDescText: text.SANDBOX_DESC,
      registryText: text.REGISTRY,
      registryDescText: text.REGISTRY_DESC,
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

<style scoped>
</style>
