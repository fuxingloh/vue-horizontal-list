<template>
  <div id="app">
    <div class="item">
      <h5>Non scrollable</h5>
      <p>For comparision</p>
    </div>

    <section>
      <vue-horizontal-list :items="items" :options="{responsive: [{size: 1}]}">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items" :options="{responsive: [{end: 576, size: 1}, {size: 2}]}">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items"
                           :options="{responsive: [{end: 576, size: 1}, {start: 576, end: 768, size: 2},{size: 3}]}">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items"
                           :options="{responsive: [{end: 576, size: 1}, {start: 576, end: 768, size: 2},{start: 768, end: 992, size: 3},{size: 4}]}">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

    <section>
      <vue-horizontal-list :items="items" :options="{item: {padding: 0}}">
        <template v-slot:default="{item}">
          <div class="item">
            <h5>{{item.title}}</h5>
            <p>{{item.content}}</p>
          </div>
        </template>
      </vue-horizontal-list>
    </section>

  </div>
</template>

<script>
  import Vue from 'vue';
  import VueHorizontalList from '@/vue-horizontal-list.vue';

  export default Vue.extend({
    name: 'ServeDev',
    components: {
      VueHorizontalList
    },
    data() {
      return {
        items: [
          {title: 'Item 0', content: 'Content item with description'},
          {title: 'Item 1', content: 'Content item with description'},
          {title: 'Item 2', content: 'Content item with description'},
          {title: 'Item 3', content: 'Content item with description'},
          {title: 'Item 4', content: 'Content item with description'},
          {title: 'Item 5', content: 'Content item with description'},
          {title: 'Item 6', content: 'Content item with description'},
          {title: 'Item 7', content: 'Content item with description'},
          {title: 'Item 8', content: 'Content item with description'},
          {title: 'Item 9', content: 'Content item with description'},
        ]
      }
    }
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
    font-family: 'Roboto', sans-serif;

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

  .item {
    padding: 16px 24px;
    border-radius: 3px;
    background: #F5F5F5;
  }

  section {
    margin-top: 24px;
  }
</style>
