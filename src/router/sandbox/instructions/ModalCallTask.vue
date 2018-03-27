<template>
  <b-modal
    id="modal-call-task"
    title="Call Task"
    @show="onShow"
    @ok="onSubmit"
    @hidden="onReset"
  >
    <b-form @submit="onSubmit" @reset="onReset" novalidate>
      <b-form-group id="select-instance-group"
        label="Instance"
        label-for="select-instance-input">
        <b-form-select id="select-instance-input"
          v-model="form.instanceId"
          :state="getValidationState(submitted, 'instance')"
          @change="onInstanceChange">
          <option value="">Select an Instance</option>
          <option v-for="(instance, key) in instances" :value="instance.id" :key="key">
            {{instance.name}}
          </option>
        </b-form-select>
        <b-form-invalid-feedback>
          {{getErrorMessage('instance')}}
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="select-task-group"
        label="Task"
        label-for="select-task-input">
        <b-form-select id="select-task-input"
          v-model="form.taskId"
          :state="getValidationState(submitted, 'task')"
          @change="onTaskChange"
          :disabled="!form.instanceId">
          <option value="">Select a Task</option>
          <option v-for="(task, key) in tasks" :value="task.id" :key="key">
            {{task.name}}
          </option>
        </b-form-select>
        <b-form-invalid-feedback>
          {{getErrorMessage('task')}}
        </b-form-invalid-feedback>
      </b-form-group>
      <div v-if="hasNeeds">
        <p>Needs</p>
        <b-form-group v-for="(need, key) in needs" :key="key" :id="'select-need'+key+'-group'"
          :label="need.name"
          :label-for="'select-need'+key+'-input'"
          :description="need.description">
          <b-form-select :id="'select-need'+key+'-input'"
            v-model="form.needs[key]"
            :state="getValidationState(submitted, 'needs['+key+']')"
            :disabled="!form.instanceId">
            <option :value="undefined">Select an Instance</option>
            <option
              v-for="(instance, key) in getInstancesByWorkerId(need.workerId)"
              :value="instance.id"
              :key="key">
              {{instance.name}}
            </option>
          </b-form-select>
          <b-form-invalid-feedback>
            {{getErrorMessage('needs['+key+']')}}
          </b-form-invalid-feedback>
        </b-form-group>
      </div>
    </b-form>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { get } from 'lodash'

export default {
  computed: {
    ...mapGetters([
      'instances',
      'tasks',
      'getInstancesByWorkerId',
      'getValidationState',
      'getErrorMessage'
    ]),
    hasNeeds () {
      return this.needs.length > 0
    },
    needs () {
      if (!this.form.taskId) return []

      const task = this.tasks.find(task => task.id === this.form.taskId)
      if (!task) return []
      return task.needs
    }
  },
  methods: {
    ...mapActions(['callTask', 'query']),
    onShow () {
      this.query()
    },
    onInstanceChange (instanceId) {
      const instance = this.instances
        .find(instance => instance.id === instanceId)
      const currentInstance = this.instances
        .find(instance => instance.id === this.form.instanceId)
      const workerId = get(instance, 'workerId', null)
      const currentWorkerId = get(currentInstance, 'workerId', null)

      if (workerId !== currentWorkerId) {
        this.form.taskId = ''
        this.form.needs = []
        if (instance) this.query({ workerId: instance.workerId })
      }
    },
    onTaskChange (taskId) {
      this.form.needs = []
    },
    onSubmit (evt) {
      this.submitted = false
      try {
        this.callTask(this.form)
        this.onReset()
      } catch (e) {
        this.submitted = true
        evt.preventDefault()
      }
    },
    onReset (evt) {
      this.submitted = false
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
