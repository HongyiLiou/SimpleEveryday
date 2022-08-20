const loginPageComponent = httpVueLoader('js/components/loginPage.vue');
const homePageComponent = httpVueLoader('js/components/homePage.vue');
const dialogComponent = httpVueLoader('js/components/dialog.vue');


new Vue({
  el: '#app',
  components: {
    'login-page-component': loginPageComponent,
    'home-page-component': homePageComponent,
    'dialog-component': dialogComponent,
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
    };
  }, 
  methods: {
    setDialogMessage: function(message) {
      this.dialog.message = message;
    },
  },
})