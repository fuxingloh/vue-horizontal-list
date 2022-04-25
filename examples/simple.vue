<template>
  <div>
    <h2>Simple</h2>
    <vue3-horizontal-list :items="items" :options="options">
      <template v-slot:default="{ item }">
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </template>
    </vue3-horizontal-list>
  </div>
</template>

<script>
import Vue3HorizontalList from "@/vue3-horizontal-list.vue";
import {ref, reactive} from 'vue'

export default {
  name: "simple",
  components: {
    Vue3HorizontalList,
  },
  setup() {
    const items = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
      return {title: `Item ${i}`, content: `🚀 Simple content ${i}`};
    }))

    const options = reactive({})

    return {
      items,
      options
    }
  }
};
</script>

<style scoped>
.item {
  padding: 16px 24px;
  border-radius: 3px;
  background: #f5f5f5;
}
</style>
