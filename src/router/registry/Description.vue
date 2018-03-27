<template>
  <div>
    <p class="lead">
      The registry allow you to define what you will be able to do in the Sandbox. There is 3 important entities to understand.
    </p>
    <p>
      First you can define <entity name="workers" type="worker"></entity> that is kind of templates for instantiable elements. Secondly, <entity name="tasks" type="task"></entity> can be associated to each <entity name="worker" type="worker"></entity>, they are functionalities.
      Finally it's possible to set <entity name="needs" type="need"></entity> for a <entity name="task" type="task"></entity>.
    </p>
    <p>
      <b-button to="/registry/workers" variant="warning" size="lg">Let's see Workers</b-button>
    </p>
    <hr>
    <h3>How the library works</h3>
    <p>
      First of all, you have to import the library (not yet available).
    </p>
    <b-alert show variant="secondary">
      <code><span class="text-dark"><strong>import</strong> createScriptor <strong>from</strong></span> 'scriptor'</code>
    </b-alert>
    <p>
      Then you have to create a <code>scriptor</code>. The <code>scriptor</code> is created using a JSON object declaring the <entity name="workers" type="worker"></entity>, <entity name="tasks" type="task"></entity> and <entity name="needs" type="need"></entity> you want to be able to use next.
    </p>
    <b-alert show variant="secondary">
      <code class="text-dark">
        <strong>const</strong> scriptor = createScriptor({<tree-view :data="JSON.parse(JSON.stringify(registryWorkers))" :options="{rootObjectKey: 'workers'}"></tree-view>})
      </code>
    </b-alert>
    <p>
      After that, you can request on entities populating the registry.
    </p>
    <b-alert show variant="secondary">
      <code class="text-dark">
        <div>scriptor.query.worker.values  <span class="text-success">// Give you an array of workers</span></div>
        <div>scriptor.query.worker.value   <span class="text-success">// Give you the first worker found</span></div>
        <br>
        <div>scriptor.query</div>
        <div>  .worker.name('worker')  <span class="text-success">// Filter on worker name "worker"</span></div>
        <div>  .task.id('id')          <span class="text-success">// Filter on task id "id"</span></div>
        <div>  .needs.values           <span class="text-success">// Give you all the needs matching the query</span></div>
      </code>
    </b-alert>
    <p>
      Finally, you are able to call instructions using the entities you have declared.
    </p>
    <b-alert show variant="secondary">
      <code class="text-dark">
        <div class="text-dark"><strong>const</strong> workers = scriptor.query.workers.values</div>
        <br>
        <div>scriptor.add.createInstance('Adrien', workers[0].id) <span class="text-success">// Create worker "Adrien" as IT Guy</span></div>
        <br>
        <div><strong>const</strong> instance = scriptor.query.instances.name('Adrien').value <span class="text-success">// Get the instance</span></div>
        <div><strong>const</strong> task = scriptor.query.workers.name('IT Guy').tasks.value <span class="text-success">// Get a task for IT Guy worker</span></div>
        <div>scriptor.add.callTask(instance.id, task.id) <span class="text-success">// Call the task</span></div>
      </code>
    </b-alert>
  </div>
</template>

<script>
import Entity from '@/components/Entity'
import { mapGetters } from 'vuex'

export default {
  components: {
    Entity
  },
  computed: {
    ...mapGetters(['registryWorkers'])
  }
}
</script>

<style scoped>
</style>
