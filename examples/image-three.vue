<template>
  <div>
    <h2>Image Three</h2>

    <vue3-horizontal-list :items="items" :options="options">
      <template v-slot:default="{ item }">
        <div>
          <div class="image-container">
            <img :src="item.image" />
          </div>

          <div class="subtitle">SUBTITLE • FOCUS</div>

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
  name: "image-three",
  components: {
    vue3HorizontalList,
  },
  setup() {
    const items = ref([
      {
        title: "Sed non ante non cras amet",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas non sagittis leo. Vestibulum sit amet metus nec neque dignissim dapibus.",
        image: "https://picsum.photos/id/1015/600/600",
      },
      {
        title: "Curabitur sit amet nunc",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id mollis erat. Aliquam erat volutpat. Nunc erat lacus, rhoncus nec.",
        image: "https://picsum.photos/id/1019/600/600",
      },
      {
        title: "Proin pharetra, ante metus",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac diam ac ex efficitur posuere. Pellentesque cursus pellentesque risus, non.",
        image: "https://picsum.photos/id/1039/600/600",
      },
      {
        title: "Cras pharetra non enim a",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada varius nibh, a malesuada nisi feugiat eget. Aenean convallis semper.",
        image: "https://picsum.photos/id/1042/600/600",
      },
      {
        title: "Proin vulputate, augue eu accumsan",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas fringilla tempor libero sit amet mollis. Praesent quis leo erat. Integer.",
        image: "https://picsum.photos/id/1044/600/600",
      },
      {
        title: "Maecenas feugiat magna sapien in",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet fringilla ante. Quisque at ipsum non lacus consequat dictum.",
        image: "https://picsum.photos/id/1057/600/600",
      },
      {
        title: "Donec commodo sed enim at",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu condimentum risus. Praesent dignissim, neque nec pharetra vestibulum, libero odio.",
        image: "https://picsum.photos/id/1063/600/600",
      },
      {
        title: "In bibendum urna et turpis",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vitae ante volutpat leo vulputate volutpat et sed ex. Vivamus eu.",
        image: "https://picsum.photos/id/1076/600/600",
      },
      {
        title: "Phasellus iaculis dignissim erat at",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mattis quam scelerisque, eleifend purus gravida, scelerisque orci. Ut et turpis.",
        image: "https://picsum.photos/id/1083/600/600",
      },
    ]);

    const options = reactive({
      responsive: [
        { end: 576, size: 1 },
        { start: 576, end: 768, size: 2 },
        { size: 3 },
      ],
    });

    return {
      items,
      options,
    };
  },
};
</script>

<style scoped>
p {
  margin-top: 4px;

  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  word-break: break-word;

  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.subtitle {
  margin-top: 12px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.image-container {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 60%;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
