<template>
    <div>
        Count {{count}} | <b-button variant="success" @click="increment">Increment</b-button> | <b-button variant="danger" @click="resetCounter">Reset</b-button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Counter',
  computed: mapGetters({
    count: 'getCount'
  }),
  methods: mapActions([
    'increment',
    'resetCounter'
  ])
}
</script>
