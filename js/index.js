const loginPageComponent = httpVueLoader('js/components/pageLogin.vue');
const homePageComponent = httpVueLoader('js/components/pageHome.vue');
const sidebarComponent = httpVueLoader('js/components/layout/sidebar.vue');
const dialogComponent = httpVueLoader('js/components/layout/dialog.vue');
const cursorComponent = httpVueLoader('js/components/layout/cursor.vue');


new Vue({
  el: '#app',
  components: {
    'login-page-component': loginPageComponent,
    'home-page-component': homePageComponent,
    'sidebar-component': sidebarComponent,
    'dialog-component': dialogComponent,
    'cursor-component': cursorComponent,
  },
  data: function() {
    return {
      activePage: 'login',
      user: {
        isLogin: false,
        settings: {},
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
    afterLogin: function(userData) {
      const that = this;
      this.user.isLogin = true;
      this.getUserSettings(userData);
      setTimeout(function() {
        that.activePage = 'home';
      }, 700);
    },
    onLogout: function() {
      const loginInformation = JSON.parse(localStorage.getItem('login_information'));
      const rememberMe = loginInformation.rememberMe || false;
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
    handlePageChange: function(page) {
      this.activePage = page;
      if (page === 'login') {
        this.onLogout();
      }
    },
    getUserSettings: function(userSettings) {
      this.user.settings = userSettings;
    },
  },
  watch: {
    activePage: {
      handler: function(newVal) {
        console.log('page', newVal);
      },
    },
  },
})