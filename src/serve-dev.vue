<script>
import Vue from 'vue';
import VueHorizontalList from '@/vue-horizontal-list.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueHorizontalList
  }
});
</script>

<template>
  <div id="app">
    <vue-horizontal-list />
  </div>
</template>
