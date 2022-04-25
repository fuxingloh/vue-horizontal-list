<template>
  <div class="vue3-horizontal-list" ref="container">
    <div class="vhl-navigation" v-if="width.window > options.navigation.start">
      <div @click="prev" v-if="hasPrev" class="vhl-btn-left">
        <slot name="nav-prev">
          <svg
            :fill="options.navigation.color"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.757 12l4.95 4.95a1 1 0 1 1-1.414 1.414l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 1.414L10.757 12z"
            />
          </svg>
        </slot>
      </div>

      <div @click="next" v-if="hasNext" class="vhl-btn-right">
        <slot name="nav-next">
          <svg
            :fill="options.navigation.color"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
          >
            <path
              d="M13.314 12.071l-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"
            />
          </svg>
        </slot>
      </div>
    </div>

    <div class="vhl-container" :style="style.container">
      <div
        class="vhl-list"
        ref="list"
        :class="options.list.class"
        :style="style.list"
        @scroll="scrollHandler"
      >
        <div
          v-for="(item, index) in dataItems"
          ref="item"
          class="vhl-item"
          :class="options.item.class"
          :style="style.item"
          :key="index"
        >
          <slot v-if="item.type === 'start'" name="start"></slot>
          <slot v-else-if="item.type === 'end'" name="end"></slot>
          <slot v-else-if="item.type === 'item'" v-bind:item="item.item">{{
            item
          }}</slot>
        </div>

        <div :style="style.tail"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  computed,
  nextTick,
  useSlots,
  onBeforeUnmount,
} from "vue";

export default {
  name: "Vue3HorizontalList",
  props: {
    /**
     * items to display in horizontal-list
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * item.class = css class for each individual item.
     * item.padding = padding between each item in the list.
     *
     * list.class = css class for the parent of item
     * list.windowed = maximum width of the list it can extend to, basically the container max-width
     * list.padding = padding of the list, if container < windowed what is the left-right padding of the list
     *
     * responsive breakpoints to calculate how many items to show in the list at each width interval
     * Examples:
     * [{size: 5}] show 5 items regardless
     * [{end: 992, size: 3}},{size: 4}] < 992 show 3 items, else show 4 items
     * [{end: 576, size: 1}, {start: 576, end: 992, size: 2}, {size: 3}] < 576 show 1, 576 - 992 show 2, else show 3
     *
     * These are the default responsive fallback, if you don't have a catch all, it will fallback to
     * [{end: 576, size: 1},
     * {start: 576, end: 768, size: 2},
     * {start: 768, end: 992, size: 3},
     * {start: 992, end: 1200, size: 4},
     * {start: 1200, size: 5}]
     */
    options: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    /**
     * Current item position of list
     */
    const position = ref(0);

    /**
     * Width of item, list and window
     */
    const width = reactive({
      container: 0,
      window: 576,
    });

    const container = ref(null);
    const list = ref(null);
    const item = ref(null);

    const $resize = () => {
      width.window = window.innerWidth;
      width.container = container.value.clientWidth;
    };

    /**
     * Debounce timer of the scroll
     */
    const scrollTimer = ref(null);
    /**
     * Interval of the autoPlay
     */
    const autoPlayInterval = ref(null);

    const dataItems = computed(() => {
      const slots = useSlots();
      const start = slots.start;
      const end = slots.end;
      return [
        ...(start ? [{ type: "start" }] : []),
        ...props.items.map((value) => ({ type: "item", item: value })),
        ...(end ? [{ type: "end" }] : []),
      ];
    });

    const length = computed(() => {
      return dataItems.value.length;
    });

    const options = computed(() => {
      return {
        navigation: {
          start: props.options?.navigation?.start ?? 992,
          // TODO(fuxing): Deprecate this in favor of navigation slot
          color: props.options?.navigation?.color ?? "#000",
        },
        item: {
          class: props.options?.item?.class ?? "",
          padding: props.options?.item?.padding ?? 16,
        },
        list: {
          class: props.options?.list?.class ?? "",
          windowed: props.options?.list?.windowed ?? 1200,
          padding: props.options?.list?.padding ?? 24,
        },
        responsive: [
          ...(props.options?.responsive ?? []),

          // Fallback default responsive
          { end: 576, size: 1 },
          { start: 576, end: 768, size: 2 },
          { start: 768, end: 992, size: 3 },
          { start: 992, end: 1200, size: 4 },
          { start: 1200, size: 5 },
        ],
        position: {
          start: props.options?.position?.start ?? 0,
        },
        autoplay: {
          play: props.options?.autoplay?.play ?? false,
          speed: props.options?.autoplay?.speed ?? 2000,
          repeat: props.options?.autoplay?.repeat ?? false,
        },
      };
    });

    const style = computed(() => {
      const style = {
        container: {
          marginLeft: "",
          marginRight: "",
        },
        list: {},
        item: {
          width: "",
          paddingLeft: "",
          paddingRight: "",
          marginRight: "",
        },
        tail: {},
      };

      // Full Screen Mode
      if (width.window < options.value.list.windowed) {
        style.container.marginLeft = `-${options.value.list.padding}px`;
        style.container.marginRight = `-${options.value.list.padding}px`;

        style.item.width = `${
          (workingWidth.value - (size.value - 1) * options.value.item.padding) /
          size.value
        }px`;
        style.item.paddingLeft = `${options.value.list.padding}px`;
        style.item.paddingRight = `${options.value.item.padding}px`;
        style.item.marginRight = `-${options.value.list.padding}px`;
      }

      // Windowed Mode
      else {
        style.item.paddingLeft = `${options.value.item.padding / 2}px`;
        style.item.paddingRight = `${options.value.item.padding / 2}px`;

        style.container.marginLeft = `-${options.value.item.padding / 2}px`;
        style.container.marginRight = `-${options.value.item.padding / 2}px`;

        style.item.width = `${
          (workingWidth.value - (size.value - 1) * options.value.item.padding) /
          size.value
        }px`;
      }

      return style;
    });

    const itemWidth = computed(() => {
      return (
        (workingWidth.value - (size.value - 1) * options.value.item.padding) /
        size.value
      );
    });

    /**
     * @return number actual width of the container
     */
    const workingWidth = computed(() => {
      // Full Screen Mode
      if (width.window < options.value.list.windowed) {
        return width.window - options.value.list.padding * 2;
      }

      // Windowed Mode
      else {
        return width.container;
      }
    });

    /**
     * @return visible items in horizontal list at the current width/state
     */
    const size = computed(() => {
      const width = workingWidth.value;
      return options.value.responsive.find((value) => {
        return (
          (!value.start || value.start <= width) &&
          (!value.end || value.end >= width)
        );
      }).size;
    });

    /**
     * @return boolean whether there is prev set of items for navigation
     * @private internal use
     */
    const hasNext = computed(() => {
      return length.value > position.value + size.value;
    });

    /**
     * @return boolean whether there is next set of items for navigation
     * @private internal use
     */
    const hasPrev = computed(() => {
      return position.value > 0;
    });

    /**
     * @param position of item to scroll to
     */
    const go = (positionTo) => {
      const maxPosition = length.value - size.value;
      position.value = positionTo > maxPosition ? maxPosition : positionTo;

      const left =
        itemWidth.value * position.value +
        position.value * options.value.item.padding;
      list.value.scrollTo({ top: 0, left: left, behavior: "smooth" });
    };

    /**
     * Run autoPlay slide show
     */
    const runAutoPlay = () => {
      autoPlayInterval.value = setInterval(() => {
        if (
          options.value.autoplay.repeat &&
          position.value === length.value - size.value
        ) {
          position.value = 0;
          go(position.value);
        } else {
          position.value = position.value + 1;
          go(position.value);
        }
      }, options.value.autoplay.speed);
    };

    /**
     * Stop autoPlay slide show
     */
    const stopAutoPlay = () => {
      if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
      }
    };

    /**
     * Go to a set of previous items
     */
    const prev = () => {
      go(position.value - size.value);
    };

    /**
     * Go to a set of next items
     */
    const next = () => {
      go(position.value + size.value);
    };

    /**
     * On horizontal scroll re-evaluate the actual position
     */
    const scrollHandler = () => {
      clearTimeout(scrollTimer.value);

      //Renew timer
      scrollTimer.value = setTimeout(() => {
        const parentLeftOffset = list.value.getBoundingClientRect().left;

        let items = dataItems.value.map((_, index) => {
          const itemLeftOffset = item.value[index].getBoundingClientRect().left;
          return Math.abs(itemLeftOffset - parentLeftOffset);
        });

        position.value = items.indexOf(Math.min(...items));
      }, 50);
    };

    onMounted(() => {
      // TODO(fuxing): Need to re-do this
      // Added a simple SSR fix, need to look into it for optimization in the future
      require("smoothscroll-polyfill").polyfill();

      $resize();
      window.addEventListener("resize", $resize);

      if (options.value.position.start) {
        nextTick(() => {
          go(options.value.position.start);
        });
      }

      if (options.value.autoplay.play) {
        runAutoPlay();
      }
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", $resize);
      stopAutoPlay();
    });

    return {
      position,
      width,
      container,
      list,
      item,
      scrollTimer,
      autoPlayInterval,
      dataItems,
      options,
      style,
      hasPrev,
      hasNext,
      prev,
      next,
      scrollHandler,
    };
  },
};
</script>

<style scoped>
.vue3-horizontal-list {
  position: relative;
}

.vhl-navigation {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;

  margin-top: -6px;
}

.vhl-btn-left,
.vhl-btn-right {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 24px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  z-index: 2;
}

.vhl-btn-left:hover,
.vhl-btn-right:hover {
  cursor: pointer;
}

.vhl-btn-left {
  margin-left: -24px;
  margin-right: auto;
}

.vhl-btn-right {
  margin-left: auto;
  margin-right: -24px;
}

.vhl-container {
  overflow-y: hidden;
  height: 100%;
  margin-bottom: -24px;
}

.vhl-list {
  display: flex;
  padding-bottom: 24px;
  margin-bottom: -24px;

  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
}

.vhl-item {
  box-sizing: content-box;

  padding-top: 24px;
  padding-bottom: 24px;

  z-index: 1;

  /* Prevent content from collapsing when empty. E.g. image while loading height=0. */
  min-height: 1px;
}

.vhl-list > * {
  scroll-snap-align: start;
  flex-shrink: 0;
}
</style>
