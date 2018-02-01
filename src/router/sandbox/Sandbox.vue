<template>
  <div id="sandbox">
    <h1>
      <router-link to="/sandbox">{{title}}</router-link> <small class="text-muted">{{description}}</small>
    </h1>
    <hr />
    <div id="modals">
      <modal-call-task/>
      <modal-create-instance/>
    </div>
    <b-button-toolbar>
      <b-button-group>
        <b-dropdown size="sm" id="ddown-add-instruction" text="Add Instruction" variant="outline-primary">
          <b-dropdown-item id="bt-modal-call-task" v-b-modal="'modal-call-task'">Call Task</b-dropdown-item>
          <b-dropdown-item id="bt-modal-create-instance" v-b-modal="'modal-create-instance'">Create an Instance</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </b-button-toolbar>
    <instructions />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import text from '@/text.js'
import Instructions from '@/router/sandbox/Instructions'
import ModalCallTask from '@/router/sandbox/instructions/ModalCallTask'
import ModalCreateInstance from '@/router/sandbox/instructions/ModalCreateInstance'

export default {
  components: {
    Instructions,
    ModalCallTask,
    ModalCreateInstance
  },
  methods: {
    ...mapActions(['query'])
  },
  created () {
    this.query()
  },
  data () {
    return {
      title: text.SANDBOX,
      description: text.SANDBOX_DESC
    }
  }
}
</script>

<style scoped>
  hr {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .btn-toolbar {
    margin-bottom: 0.5rem;
  }
</style>
