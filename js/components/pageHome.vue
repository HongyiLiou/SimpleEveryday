<template>
  <div class="page" v-if="activePage === 'home'">
    <!-- <header class="header">
      <div style="color: #fff">{{ text }}</div>
    </header> -->
  </div>
</template>

<script>
  module.exports = {
    name: 'home-page-component',
    props: ['activePage'],
    data: function() {
      return {
        text: 'try it.'
      };
    },
    mounted: function() {
      console.log('activePage', this.activePage);
    }
  }
</script>
