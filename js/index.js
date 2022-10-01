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
      user: {
        isLogin: false,
      },
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
    afterLogin: function() {
      const that = this;
      this.user.isLogin = true;
      setTimeout(function() {
        that.activePage = 'home';
      }, 2000);
    },
    onLogout: function() {
      const loginInformation = JSON.parse(localStorage.getItem('login_information'));
      const rememberMe = loginInformation.rememberMe;
      const that = this;
      if (!rememberMe) {
        removeItemFromLocalStorage('login_information');
      } else {
        const newLoginInformation = {
          key: 'login_information',
          value: {
            account: loginInformation.account,
            password: loginInformation.password,
            rememberMe: loginInformation.rememberMe,
            lastTime: loginInformation.lastTime,
            isLogin: false,
          },
        };
        setItemToLocalStorage(newLoginInformation);
        setTimeout(function() {
          that.activePage = 'login';
        }, 2000);
      }
      loginInformation.isLogin = false;
      this.user.isLogin = false;
    },
    setDialogMessage: function(message) {
      this.dialog.message = message;
    },
    handleScreenClick: function(event) {
      const e = event || window.event;
      this.cursor.position = { x: e.clientX, y: e.clientY };
    },
  },
})