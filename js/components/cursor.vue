<template>
  <div>
    <div class="cursor_circle" v-for="cursor in cursors" :style="{ top: `${cursor.y}px`, left: `${cursor.x}px` }"></div>
  </div>
</template>

<script>
  module.exports = {
    name: 'home-page-component',
    props: ['position', 'show'],
    data: function() {
      return {
        cursors: [],
      };
    },
    watch: {
      position: {
        deep: true,
        handler: function(newVal) {
          if (this.show) {
            this.cursors.push(newVal);
            setTimeout(() => {
              this.cursors.splice(this.cursors.indexOf(newVal), 1);
            }, 450);
          }
        },
      }
    },
  }
</script>
