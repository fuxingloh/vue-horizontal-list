<template>
  <div id="app">
    <simple />

    <position-start />

    <full-width />

    <responsive />

    <left-right-slot />

    <auto-play />

    <item-customization />
  </div>
</template>

<script>
import Vue from "vue";
import VueHorizontalList from "@/vue-horizontal-list.vue";
import Simple from "./simple";
import PositionStart from "./position-start";
import FullWidth from "./full-width";
import Responsive from "./responsive";
import ItemCustomization from "./item-customization";
import AutoPlay from "./auto-play";
import LeftRightSlot from "./left-right-slot";

export default Vue.extend({
  name: "ServeDev",
  components: {
    LeftRightSlot,
    AutoPlay,
    ItemCustomization,
    Responsive,
    FullWidth,
    PositionStart,
    Simple,
    VueHorizontalList,
  },
});
</script>

<style>
body {
  font-family: "-apple-system", "system-ui", "BlinkMacSystemFont", "Segoe UI",
    "Roboto", "Helvetica Neue", "Arial", "sans-serif";
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 8px;
}

p {
  margin: 0;
  font-size: 17px;
  line-height: 1.5;
  font-weight: 500;
  color: #333;
  word-break: break-word;
}
</style>

<style scoped>
#app {
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

#app > div {
  margin: 48px 0;
}
</style>
