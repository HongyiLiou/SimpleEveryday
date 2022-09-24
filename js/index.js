const loginPageComponent = httpVueLoader('js/components/pageLogin.vue');
const homePageComponent = httpVueLoader('js/components/pageHome.vue');
const dialogComponent = httpVueLoader('js/components/dialog.vue');
const cursorComponent = httpVueLoader('js/components/cursor.vue');


new Vue({
  el: '#app',
  components: {
    'login-page-component': loginPageComponent,
    'home-page-component': homePageComponent,
    'dialog-component': dialogComponent,
    'cursor-component': cursorComponent,
  },
  data: function() {
    return {
      activePage: 'login',
      theme: 'light',
      mainColor: 'yellow',
      layout: {
        mobile: 'default',
        web: 'default',
        popupBorderRadius: 10,
        popupButtonBorderRadius: 10,
      },
      dialog: {
        message: null,
      },
      cursor: {
        position: { x: null, y: null },
        show: true,
      },
    };
  }, 
  methods: {
    setDialogMessage: function(message) {
      this.dialog.message = message;
    },
    handleScreenClick: function(event) {
      const e = event || window.event;
      this.cursor.position = { x: e.clientX, y: e.clientY };
    },
  },
})