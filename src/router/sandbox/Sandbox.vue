<template>
  <div>
    <h1>
      <router-link to="/sandbox">{{title}}</router-link> <small class="text-muted">{{description}}</small>
    </h1>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="(item, key) in instructions" :key="key">{{item.type}}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import text from '@/text.js'

export default {
  name: 'Sandbox',

  computed: mapGetters([
    'instructions'
  ]),

  data () {
    return {
      title: text.SANDBOX,
      description: text.SANDBOX_DESC
    }
  }
}
</script>
