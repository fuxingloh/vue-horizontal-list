<template>
  <div class="relative" ref="container">
    <div class="Controls flex-align-center absolute wh-100">
      <div @click="prev" v-if="_hasPrev"
           class="Control Prev elevation-1 relative index-navigation hover-pointer"/>
      <div @click="next" v-if="_hasNext"
           class="Control Next elevation-1 relative index-navigation hover-pointer"/>
    </div>

    <div class="Parent">
      <div class="Scrollable flex" ref="scrollable" :class="_options.list.class">
        <div v-for="item in items" :key="_options.mapKey(item)" ref="item" class="Item index-content"
             :class="_itemClass">
          <slot v-bind:item="item">{{item}}</slot>
        </div>

        <div class="Tail">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "VueHorizontalList",
    props: {
      items: {
        type: Array,
        required: true
      },
      options: Object
    },
    data() {
      return {
        position: 0,
        column: 1,
        width: {
          item: 0,
          scroll: 0,
        }
      }
    },
    computed: {
      _options() {
        return {
          item: {
            class: this.options?.item?.class || ''
          },
          list: {
            class: this.options?.list?.class || ''
          },
          size: this.options?.size || 4,
          mapKey: this.options?.mapKey || ((item) => item.id)
        }
      },
      _itemClass() {
        let sizes = ''
        for (let i = 0; i < this._options.size; i++) {
          sizes += `Size${i + 1} `
        }
        return this._options.item.class + ' ' + sizes
      },
      _hasNext() {
        return this.items.length > this.position + this.column
      },
      _hasPrev() {
        return this.position > 0
      },
    },
    mounted() {
      if (this.$refs.item) {
        this.width.item = this.$refs.item[0].clientWidth
      }

      if (this.$refs.scrollable) {
        this.width.scroll = this.$refs.scrollable.clientWidth
      }

      this.column = Math.round(this.width.scroll / this.width.item)
    },
    methods: {
      go(position) {
        const maxPosition = this.items.length - this.column
        this.position = position > maxPosition ? maxPosition : position

        this.$refs.scrollable.scrollLeft = this.width.item * this.position
      },
      prev() {
        this.go(this.position - this.column)
      },
      next() {
        this.go(this.position + this.column)
      },
    }
  }
</script>

<style scoped lang="less">
  .Next, .Prev {
    width: 46px;
    height: 46px;

    border-radius: 23px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    &::after {
      position: absolute;
      content: "";

      top: calc(50%);
      margin-top: -6px;
      height: 14px;
      width: 14px;
      border-right: 2px solid rgba(0, 0, 0, 0.85);
      border-bottom: 2px solid rgba(0, 0, 0, 0.85);
    }
  }

  .Prev {
    margin-left: -18px;
    margin-right: auto;

    &::after {
      margin-left: 19px;
      transform: rotate(135deg);
    }
  }

  .Next {
    margin-left: auto;
    margin-right: -18px;

    &::after {
      margin-left: 13px;
      transform: rotate(-45deg);
    }
  }
</style>

<style scoped lang="less">
  .Parent {
    overflow-y: hidden;
    height: 100%;
    margin-bottom: -24px;
  }

  .Scrollable {
    padding-bottom: 24px;
    margin-bottom: -24px;

    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    > * {
      scroll-snap-align: start;
      flex-shrink: 0;
    }
  }

  .Controls {
    visibility: hidden;

    @media (min-width: 992px) {
      visibility: initial;
    }
  }
</style>

<style scoped lang="less">
  .Parent {
    margin: -24px;
  }

  .Item {
    padding: 24px 0 24px 24px;
    margin-right: -8px;
  }

  .Tail {
    width: 32px;
  }

  @media (max-width: 576px) {
    .Size1 {
      flex: 0 0 calc(100% - 24px);
      max-width: calc(100% - 24px);
    }
  }

  @media (min-width: 576px) {
    .Size2 {
      flex: 0 0 calc((100% - 16px) / 2);
      max-width: calc((100% - 16px) / 2);
    }
  }

  @media (min-width: 768px) {
    .Size3 {
      flex: 0 0 calc((100% - 8px) / 3);
      max-width: calc((100% - 8px) / 3);
    }
  }

  @media (min-width: 992px) {
    .Size4 {
      flex: 0 0 25%;
      max-width: 25%;
    }
  }

  @media (min-width: 1200px) {
    .Parent {
      margin-left: -12px;
      margin-right: -12px;
    }

    .Item {
      padding: 24px 12px 24px 12px;
      margin-right: 0;
    }

    .Size5 {
      flex: 0 0 20%;
      max-width: 20%;
    }
  }
</style>
