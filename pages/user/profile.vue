<template>
  <div>
    <Header />
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          {{ sleepData }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '~/components/header.vue';

export default Vue.extend({
  components: {
    Header,
  },
  data() {
    return {
      sleepData: 'please wait',
    };
  },
  async mounted() {
    try {
      const data = await fetch('/api/sleepdata');
      this.sleepData = await data.json();
    } catch (err) {
      console.log(err);
      this.sleepData = err;
    }
  },
});
</script>
