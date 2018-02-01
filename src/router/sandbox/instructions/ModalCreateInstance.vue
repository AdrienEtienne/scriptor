<template>
  <b-modal
    id="modal-create-instance"
    title="Create an Instance"
    @ok="onSubmit"
    @hidden="onReset"
  >
    <b-form @submit="onSubmit" @reset="onReset" novalidate>
      <b-form-group id="instance-name-group"
        label="Name"
        label-for="input-instance-name">
        <b-form-input id="input-instance-name"
          type="text"
          v-model="form.name"
          placeholder="An instance name"
          :state="getValidationState(submitted, 'instance.name')">
        </b-form-input>
        <b-form-invalid-feedback>
          {{getErrorMessage('instance.name')}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="select-worker-group"
        label="Worker"
        label-for="input-select-worker">
        <b-form-select id="input-select-worker"
          v-model="form.workerId"
          :state="getValidationState(submitted, 'worker')">
          <option value="" label="">Select a worker</option>
          <option v-for="(worker, key) in workers" :value="worker.id" :key="key" :label="worker.name">
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
    ...mapGetters([
      'workers',
      'getValidationState',
      'getErrorMessage'
    ])
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
