<template>
  <b-modal
    id="modal-call-task"
    title="Call Task"
    @show="onShow"
    @ok="onSubmit"
    @hidden="onReset"
  >
    <b-form @submit="onSubmit" @reset="onReset" novalidate>
      <b-form-group id="selectInstanceGroup"
        label="Instance"
        label-for="selectInstanceInput">
        <b-form-select id="selectInstanceInput"
          v-model="form.instanceId"
          :state="getValidationState(submitted, 'instance')"
          @change="onInstanceChange">
          <option value="">Select an instance</option>
          <option v-for="(instance, key) in instances" :value="instance.id" :key="key">
            {{instance.name}}
          </option>
        </b-form-select>
        <b-form-invalid-feedback>
          {{getErrorMessage('instance')}}
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['instances', 'getValidationState', 'getErrorMessage'])
  },
  methods: {
    ...mapActions(['callTask', 'query']),
    onShow () {
      this.query()
    },
    onInstanceChange (instanceId) {
      this.form.taskId = ''
      this.form.needs = []
      this.query({ instanceId })
    },
    onSubmit (evt) {
      this.submitted = false
      try {
        this.callTask(this.form)
        this.onReset()
      } catch (e) {
        this.submitted = true
        if (evt) evt.preventDefault()
      }
    },
    onReset (evt) {
      this.submitted = false
      /* Reset our form values */
      this.form.instanceId = ''
      this.form.taskId = ''
      this.form.needs = []
      if (evt) evt.preventDefault()
    }
  },

  data () {
    return {
      submitted: false,
      form: {
        instanceId: '',
        taskId: '',
        needs: []
      }
    }
  }
}
</script>
