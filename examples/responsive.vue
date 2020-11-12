<template>
  <div>
    <h2>Responsive: 4, 3, 2, 1</h2>
    <vue-horizontal-list :items="items" :options="options">
      <template v-slot:default="{ item }">
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import VueHorizontalList from "@/vue-horizontal-list.vue";

export default {
  name: "responsive",
  components: {
    VueHorizontalList,
  },
  data() {
    return {
      items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
        return {
          title: `Responsive 4-3-2-1`,
          content: `Responsive Content ${i}!`,
        };
      }),
      options: {
        responsive: [
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { size: 4 },
        ],
      },
    };
  },
};
</script>

<style scoped>
.item {
  padding: 24px;
  border-radius: 3px;
  background: #f5f5f5;
}
</style>
