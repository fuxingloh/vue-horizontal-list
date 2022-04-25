<template>
  <div id="app">
    <h1>Vue Horizontal List</h1>
    <p>
      You can find all examples here
      <a
          href="https://github.com/fuxingloh/vue3-horizontal-list/tree/master/examples"
          target="_blank"
      >in this folder</a
      >.
    </p>

    <simple/>

    <position-start/>

    <full-width/>

    <responsive/>

    <left-right-slot/>

    <auto-play/>

    <image-two/>

    <image-three/>

    <image-four/>

    <image-five/>

    <nav-prev-next-slot/>

    <item-customization/>
  </div>
</template>

<script>
import Simple from "./simple";
import PositionStart from "./position-start";
import FullWidth from "./full-width";
import Responsive from "./responsive";
import ItemCustomization from "./item-customization";
import AutoPlay from "./auto-play";
import LeftRightSlot from "./left-right-slot";
import NavPrevNextSlot from "./nav-prev-next-slot";
import ImageTwo from "./image-two";
import ImageThree from "./image-three";
import ImageFour from "./image-four";
import ImageFive from "./image-five";

export default {
  components: {
    Simple,
    PositionStart,
    FullWidth,
    Responsive,
    ItemCustomization,
    AutoPlay,
    LeftRightSlot,
    NavPrevNextSlot,
    ImageTwo,
    ImageThree,
    ImageFour,
    ImageFive
  }
}

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
