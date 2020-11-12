<template>
  <div id="app">
    <div class="item">
      <h5>Non scrollable</h5>
      <p>For comparision</p>
    </div>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{ responsive: [{ size: 1 }] }"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{ responsive: [{ end: 576, size: 1 }, { size: 2 }] }"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 3 },
          ],
          autoplay: { play: true, repeat: true },
        }"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 3 },
          ],
        }"
      >
        <template v-slot:start>
          <div class="start-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-new-section"
                width="68"
                height="68"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#a0aec0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
                <path
                  d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2m0 -5"
                />
              </svg>
            </div>
          </div>
        </template>
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
        <template v-slot:end>
          <div class="start-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-shield-check"
                width="68"
                height="68"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#a0aec0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 12l2 2l4 -4" />
                <path
                  d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
                />
              </svg>
            </div>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 3 },
          ],
          autoplay: { play: true, repeat: true, speed: 1200 },
        }"
      >
        <template v-slot:start>
          <div class="start-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-new-section"
                width="68"
                height="68"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#a0aec0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="12" y1="9" x2="12" y2="15" />
                <path
                  d="M4 6v-1a1 1 0 0 1 1 -1h1m5 0h2m5 0h1a1 1 0 0 1 1 1v1m0 5v2m0 5v1a1 1 0 0 1 -1 1h-1m-5 0h-2m-5 0h-1a1 1 0 0 1 -1 -1v-1m0 -5v-2m0 -5"
                />
              </svg>
            </div>
          </div>
        </template>
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
        <template v-slot:end>
          <div class="start-item">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-shield-check"
                width="68"
                height="68"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#a0aec0"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 12l2 2l4 -4" />
                <path
                  d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
                />
              </svg>
            </div>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list
        :items="items"
        :options="{
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { start: 768, end: 992, size: 3 },
            { size: 4 },
          ],
        }"
      >
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items">
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items" :options="{ item: { padding: 0 } }">
        <template v-slot:default="{ item }">
          <div class="item">
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import VueHorizontalList from "@/vue-horizontal-list.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueHorizontalList,
  },
  data() {
    return {
      items: [
        { title: "Item 0", content: "Content item with description" },
        { title: "Item 1", content: "Content item with description" },
        { title: "Item 2", content: "Content item with description" },
        { title: "Item 3", content: "Content item with description" },
        { title: "Item 4", content: "Content item with description" },
        { title: "Item 5", content: "Content item with description" },
        { title: "Item 6", content: "Content item with description" },
        { title: "Item 7", content: "Content item with description" },
        { title: "Item 8", content: "Content item with description" },
        { title: "Item 9", content: "Content item with description" },
      ],
    };
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  font-family: "Roboto", sans-serif;

  max-width: 1400px;

  margin-left: auto;
  margin-right: auto;

  padding: 80px 24px;
}

@media (min-width: 1200px) {
  #app {
    padding-left: 80px;
    padding-right: 80px;
  }
}

h5 {
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 8px;
}

p {
  font-size: 17px;
  line-height: 1.5;
  font-weight: 400;
  margin: 0;

  word-break: break-word;
}
.start-item {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background: #ffe6e6;
  height: 92px;
}
.icon {
  display: flex;
  justify-content: center;
}
.item {
  padding: 16px 24px;
  border-radius: 3px;
  background: #f5f5f5;
}

section {
  margin-top: 24px;
}
</style>
