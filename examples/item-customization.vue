<template>
  <div>
    <h2>Item Customization</h2>
    <p>Remove padding and add a css class 'item-custom-name' to item.</p>
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
import { ref, reactive } from "vue";

export default {
  name: "item-customization",
  components: {
    Vue3HorizontalList,
  },
  setup() {
    const items = ref(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return { title: `Item Customization ${i}`, content: `Customized Item` };
      })
    );

    const options = reactive({
      item: {
        class: "item-custom-name",
        padding: 0,
      },
    });

    return {
      items,
      options,
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

<style>
.item-custom-name h3,
.item-custom-name p {
  color: red;
}
</style>
