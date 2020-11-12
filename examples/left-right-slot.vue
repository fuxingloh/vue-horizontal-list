<template>
  <div>
    <h2>Slots: Left & Right</h2>
    <vue-horizontal-list :items="items" :options="options">
      <template v-slot:start>
        <div class="item item-start-end">
          <div>
            <h3>START</h3>
            <p>-</p>
          </div>
        </div>
      </template>
      <template v-slot:default="{ item }">
        <div class="item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </template>
      <template v-slot:end>
        <div class="item item-start-end">
          <div>
            <h3>END</h3>
            <p>-</p>
          </div>
        </div>
      </template>
    </vue-horizontal-list>
  </div>
</template>

<script>
import VueHorizontalList from "@/vue-horizontal-list.vue";

export default {
  name: "left-right-slot",
  components: {
    VueHorizontalList,
  },
  data() {
    return {
      items: [0, 1, 2, 3, 4, 5].map((i) => {
        return { title: `Left Right Slot ${i}`, content: `3 slots` };
      }),
      options: {},
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

.item-start-end {
  background: #333;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
