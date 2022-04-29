<template>
  <div>
    <h2>Autoplay</h2>
    <p>
      Contributed by
      <a href="https://github.com/Draccano" target="_blank">@Draccano</a>
    </p>

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
import vue3HorizontalList from "@/vue3-horizontal-list.vue";
import { ref, reactive } from "vue";

export default {
  name: "auto-play",
  components: {
    vue3HorizontalList,
  },
  setup() {
    const items = ref(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        return { title: `Auto play ${i}`, content: `Auto play, 3000ms.` };
      })
    );

    const options = reactive({
      autoplay: { play: true, repeat: true, speed: 3000 },
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
