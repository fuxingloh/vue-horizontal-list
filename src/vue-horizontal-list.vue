<template>
  <div class="vue-horizontal-list" ref="container">
    <div class="vhl-navigation" v-if="width.window > _options.navigation.start">
      <div @click="prev" v-if="_hasPrev"
           class="vhl-btn-left">
        <svg :fill="_options.navigation.color" width="32px" height="32px" viewBox="0 0 24 24">
          <path d="M10.757 12l4.95 4.95a1 1 0 1 1-1.414 1.414l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 1.414L10.757 12z"/>
        </svg>
      </div>

      <div @click="next" v-if="_hasNext"
           class="vhl-btn-right">
        <svg :fill="_options.navigation.color" width="32px" height="32px" viewBox="0 0 24 24">
          <path d="M13.314 12.071l-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"/>
        </svg>
      </div>
    </div>

    <div class="vhl-container" :style="_style.container">
      <div class="vhl-list" ref="list" :class="_options.list.class" :style="_style.list">
        <div v-for="item in items" ref="item" class="vhl-item" :class="_options.item.class" :style="_style.item">
          <slot v-bind:item="item">{{item}}</slot>
        </div>

        <div :style="_style.tail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import smoothscroll from 'smoothscroll-polyfill';

  smoothscroll.polyfill();

  export default {
    name: "VueHorizontalList",
    props: {

      /**
       * items to display in horizontal-list
       */
      items: {
        type: Array,
        required: true
      },

      /**
       * item.class = css class for each individual item
       * item.padding = padding between each item in the list
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
       * These are the default responsive fallback, if you don't have a catch all, it will fallback to this.
       * [{end: 576, size: 1},
       * {start: 576, end: 768, size: 2},
       * {start: 768, end: 992, size: 3},
       * {start: 992, end: 1200, size: 4},
       * {start: 1200, size: 5}]
       */
      options: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        /**
         * Current item position of list
         */
        position: 0,

        /**
         * Width of item, list and window
         */
        width: {
          container: 0,
          window: 576
        }
      }
    },
    mounted() {
      this.$resize = () => {
        this.width.window = window.innerWidth
        this.width.container = this.$refs.container.clientWidth
      }

      this.$resize()
      window.addEventListener('resize', this.$resize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.$resize)
    },
    computed: {
      _options() {
        const options = this.options

        return {
          navigation: {
            start: options && options.navigation && options.navigation.start || 992,
            color: options && options.navigation && options.navigation.color || '#000',
          },
          item: {
            class: options && options.item && options.item.class || '',
            padding: options && options.item && options.item.padding || 16,
          },
          list: {
            class: options && options.list && options.list.class || '',
            windowed: options && options.list && options.list.windowed || 1200,
            padding: options && options.list && options.list.padding || 24,
          },
          responsive: [
            ...(options && options.responsive || []),

            // Fallback default responsive
            {end: 576, size: 1},
            {start: 576, end: 768, size: 2},
            {start: 768, end: 992, size: 3},
            {start: 992, end: 1200, size: 4},
            {start: 1200, size: 5},
          ],
        }
      },

      _style() {
        const style = {
          container: {},
          list: {},
          item: {},
          tail: {}
        }

        const workingWidth = this._workingWidth
        const size = this._size

        // Full Screen Mode
        if (this.width.window < this._options.list.windowed) {
          style.container.marginLeft = `-${this._options.list.padding}px`
          style.container.marginRight = `-${this._options.list.padding}px`

          style.item.width = `${(workingWidth - (size - 1) * this._options.item.padding) / size}px`
          style.item.paddingLeft = `${this._options.list.padding}px`
          style.item.paddingRight = `${this._options.item.padding}px`
          style.item.marginRight = `-${this._options.list.padding}px`
        }

        // Windowed Mode
        else {
          style.item.paddingLeft = `${this._options.item.padding / 2}px`
          style.item.paddingRight = `${this._options.item.padding / 2}px`

          style.container.marginLeft = `-${this._options.item.padding / 2}px`
          style.container.marginRight = `-${this._options.item.padding / 2}px`

          style.item.width = `${(workingWidth - (size - 1) * this._options.item.padding) / size}px`

        }

        return style
      },

      _itemWidth() {
        return (this._workingWidth - (this._size - 1) * this._options.item.padding) / this._size
      },

      /**
       * @return number actual width of the container
       */
      _workingWidth() {
        // Full Screen Mode
        if (this.width.window < this._options.list.windowed) {
          return this.width.window - this._options.list.padding * 2
        }

        // Windowed Mode
        else {
          return this.width.container
        }
      },

      /**
       * @return visible items in horizontal list at the current width/state
       */
      _size() {
        const width = this._workingWidth
        return this._options.responsive.find(value => {
          return (!value.start || value.start <= width) && (!value.end || value.end >= width)
        }).size
      },

      /**
       * @return boolean whether there is prev set of items for navigation
       * @private internal use
       */
      _hasNext() {
        return this.items.length > this.position + this._size
      },

      /**
       * @return boolean whether there is next set of items for navigation
       * @private internal use
       */
      _hasPrev() {
        return this.position > 0
      },
    },
    methods: {
      /**
       * @param position of item to scroll to
       */
      go(position) {
        const maxPosition = this.items.length - this._size
        this.position = position > maxPosition ? maxPosition : position

        const left = this._itemWidth * this.position + this.position * this._options.item.padding
        this.$refs.list.scrollTo({top: 0, left: left, behavior: 'smooth'})
      },

      /**
       * Go to a set of previous items
       */
      prev() {
        this.go(this.position - this._size)
      },

      /**
       * Go to a set of next items
       */
      next() {
        this.go(this.position + this._size)
      },
    }
  }
</script>

<style scoped>
  .vue-horizontal-list {
    position: relative;
  }

  .vhl-navigation {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .vhl-btn-left, .vhl-btn-right {
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

  .vhl-btn-left:hover, .vhl-btn-right:hover {
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
  }

  .vhl-list > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  .vhl-item {
    z-index: 1;
  }
</style>
