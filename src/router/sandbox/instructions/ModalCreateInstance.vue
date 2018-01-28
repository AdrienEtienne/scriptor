<template>
  <b-modal
    id="modal-create-instance"
    title="Create an Instance"
    @ok="onSubmit"
    @hidden="onReset"
  >
    <b-form @submit="onSubmit" @reset="onReset" novalidate>
      <b-form-group id="createInstanceNameGroup"
        label="Name"
        label-for="createInstanceName">
        <b-form-input id="createInstanceName"
          type="text"
          v-model="form.name"
          placeholder="An instance name"
          :state="getValidationState(submitted, 'instance.name')">
        </b-form-input>
        <b-form-invalid-feedback>
          {{getErrorMessage('instance.name')}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="selectWorkerGroup"
        label="Worker"
        label-for="selectWorkerInput">
        <b-form-select id="selectWorkerInput"
          v-model="form.workerId"
          :state="getValidationState(submitted, 'worker')">
          <option value="">Select a worker</option>
          <option v-for="(worker, key) in workers" :value="worker.id" :key="key">
            {{worker.name}}
          </option>
        </b-form-select>
        <b-form-invalid-feedback>
          {{getErrorMessage('worker')}}
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['workers', 'getValidationState', 'getErrorMessage'])
  },
  methods: {
    ...mapActions(['createInstance']),
    onSubmit (evt) {
      this.submitted = false
      try {
        this.createInstance(this.form)
        this.onReset()
      } catch (e) {
        this.submitted = true
        if (evt) evt.preventDefault()
      }
    },
    onReset (evt) {
      this.submitted = false
      /* Reset our form values */
      this.form.name = ''
      this.form.workerId = ''
      if (evt) evt.preventDefault()
    }
  },

  data () {
    return {
      submitted: false,
      form: {
        name: '',
        workerId: ''
      }
    }
  }
}
</script>
