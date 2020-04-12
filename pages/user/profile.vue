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
import Header from '~/components/header';

export default {
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
      console.error(err);
      return 'unable to fetch data';
    }
  },
};
</script>
