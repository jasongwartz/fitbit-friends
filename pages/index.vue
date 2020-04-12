<template>
  <div>
    <Header />
    <div class="hero is-primary is-bold is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Hello
          </h1>
          <a
            class="button is-info"
            :href="fitbitAuthURL"
          >
            Login
          </a>


          <nuxt-link to="/user/profile">
            <button
              class="button is-info"
            >
              data
            </button>
          </nuxt-link>
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
  data: function () {
    return {
      fitbitAuthURL: '/api/login',
    };
  },
};
</script>
