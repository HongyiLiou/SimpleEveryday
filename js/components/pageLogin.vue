<template>
  <div v-if="activePage === 'login'" :class="{ 'is_login': isLogin }">
    <div class="background"></div>
    <article class="login_area">
      <section class="input_block">
        <div class="login_board" :class="{ 'signup': active === 'signup' }">
          <div class="wrapper" :class="{ 'hide': active === 'signup' }">
            <div class="input_group" :class="{ 'active': login.account, 'error': login.accountError }">
              <input type="text" :value="login.account" @input="onInputLoginAccount" spellcheck="false">
              <p class="label">Account</p>
              <p class="message" v-if="login.accountError">{{login.accountError}}</p>
            </div>
            <div class="input_group" :class="{ 'active': login.password, 'error': login.passwordError }">
              <input class="password" :type="showPassword ? 'text' : 'password'" :value="login.password" @input="onInputLoginPassword" spellcheck="false">
              <p class="label">Password</p>
              <p class="message" v-if="login.passwordError">{{login.passwordError}}</p>
              <button class="show_password_btn" :title="showPassword ? '太害羞ㄌㄅ' : '要不要顯示密碼R'" @click="onShowPasswordClick">
                {{showPassword ? '😲' : '🧐'}}
              </button>
            </div>
            <label title="是不是想要我記住你?">
              <input type="checkbox" v-model="login.rememberMe">
              <div class="checkbox"></div>
              <p class="checkbox_text">Remember who I am.</p>
            </label>
          </div>
          <div class="wrapper" :class="{ 'hide': active === 'login' }">
            <div class="input_group" :class="{ 'active': signup.userName }">
              <input type="text" v-model="signup.userName" spellcheck="false">
              <p class="label">暱稱(可隨時修改)</p>
            </div>
            <div class="input_group" :class="{ 'active': signup.account, 'error': signup.accountError }">
              <input type="text" :value="signup.account" @input="onInputSignupAccount" spellcheck="false">
              <p class="label">帳號</p>
              <p class="message" v-if="signup.accountError">{{signup.accountError}}</p>
            </div>
            <div class="input_group" :class="{ 'active': signup.password }">
              <input class="password" type="password" v-model="signup.password" spellcheck="false">
              <p class="label">密碼</p>
            </div>
            <div class="input_group" :class="{ 'active': signup.passwordAgain, 'error': signup.passwordError }">
              <input class="password" type="password" :value="signup.passwordAgain" @input="onInputSignupPasswordAgain" spellcheck="false">
              <p class="label">再次輸入密碼</p>
              <p class="message" v-if="signup.passwordError">{{signup.passwordError}}</p>
            </div>
            <div class="input_group" :class="{ 'active': signup.email, 'error': signup.emailError }">
              <input type="text" :value="signup.email" @input="onInputSignupEmail" spellcheck="false">
              <p class="label">E-mail</p>
              <p class="message" v-if="signup.emailError">{{signup.emailError}}</p>
            </div>
          </div>
        </div>
        <div class="button_board" :class="{ 'signup': active === 'signup' }">
          <button
            class="login_btn"
            :disabled="loginBtnDisabled"
            @click="onClickLogin"
          >
            Log In
            <div class="arrow" v-if="active === 'signup'"></div>
            <div class="loading" v-if="login.isLoading"></div>
          </button>
          <button
            class="login_btn"
            :disabled="signupBtnDisabled"
            @click="onClickSignup"
          >
            Sign Up
            <div class="arrow signup" v-if="active === 'login'"></div>
            <div class="loading" v-if="signup.isLoading"></div>
          </button>
        </div>
      </section>
      <input id="picture_block" name="picture_block" type="checkbox" class="toggle" @change="onChangePicture">
      <section class="picture_block">
        <label for="picture_block">
          <div class="picture">
            <div class="sun" :style="{'transform': `rotate(${picture.sunMoonRotateTurn}turn)`}"></div>
            <div class="moon" :style="{'transform': `rotate(${picture.sunMoonRotateTurn + 0.5}turn)`}"></div>
            <div class="cloud">
              <div class="cloud_right_top">
                <div class="connect"></div>
                <div class="group"></div>
              </div>
              <div class="cloud_right_bottom">
                <div class="connect"></div>
                <div class="group"></div>
              </div>
              <div class="cloud_left">
                <div class="connect"></div>
                <div class="group"></div>
              </div>
            </div>
            <div class="mountains">
              <div class="mountain_big"></div>
              <div class="mountain_small"></div>
            </div>
          </div>
        </label>
      </section>
    </article>
    <!-- <button class="test_btn" @click="setMessage({type: 'normal', text: '測試Dialog Normal'})">測試Dialog Normal</button>
    <button class="test_btn" @click="setMessage({type: 'warn', text: '測試Dialog Warn'})">測試Dialog Warn</button>
    <button class="test_btn" @click="setMessage({type: 'alert', text: '測試Dialog Alert'})">測試Dialog Alert</button> -->
  </div>
</template>


<script>
  module.exports = {
    name: 'login-page-component',
    props: ['activePage', 'isLogin'],
    data: function() {
      return {
        login: {
          account: null,
          password: null,
          accountError: null,
          passwordError: null,
          rememberMe: false,
          isLoading: false,
        },
        signup: {
          userName: null,
          account: null,
          password: null,
          passwordAgain: null,
          email: null,
          accountError: null,
          passwordError: null,
          emailError: null,
          isLoading: false,
        },
        showPassword: false,
        active: 'login',
        picture: {
          sunMoonRotateTurn: 0, // Sun 0, Moon 0.5
        },
      };
    },
    mounted: function() {
      this.init();
      window.addEventListener('keyup', this.onKeyboardEnter);
    },
    destroyed: function() {
      window.removeEventListener('keyup', this.onKeyboardEnter);
    },
    methods: {
      setLocalLoginInfo: function(account, password) {
        const that = this;
        const newLoginInformation = {
          key: 'login_information',
          value: {
            account: account || that.login.account,
            password: password || that.login.password,
            rememberMe: that.login.rememberMe,
            lastTime: new Date(),
            isLogin: true,
          },
        };
        removeItemFromLocalStorage('login_information');
        setItemToLocalStorage(newLoginInformation);
      },
      onShowPasswordClick: function() {
        this.showPassword = !this.showPassword;
      },
      onInputLoginAccount: function(e) {
        this.login.accountError = null;
        this.login.account = e.target.value;
      },
      onInputLoginPassword: function(e) {
        this.login.passwordError = null;
        this.login.password = e.target.value;
      },
      onInputSignupAccount: function(e) {
        this.signup.accountError = null;
        this.signup.account = e.target.value;
      },
      onInputSignupPasswordAgain: function(e) {
        this.signup.passwordError = null;
        this.signup.passwordAgain = e.target.value;
      },
      onInputSignupEmail: function(e) {
        this.signup.emailError = null;
        this.signup.email = e.target.value;
      },
      onChangePicture: function() {
        this.picture.sunMoonRotateTurn -= 0.5;
      },
      onClickLogin: function() {
        const that = this;
        if (that.active !== 'login') {
          that.active = 'login';
          return;
        } else {
          that.onLogin();
        }
        this.login.accountError = null;
        this.login.passwordError = null;
      },
      onClickSignup: function() {
        const that = this;
        if (that.active !== 'signup') {
          that.active = 'signup';
          return;
        } else if (this.signupValidation()) {
          this.signup.accountError = null;
          this.signup.passwordError = null;
          this.signup.emailError = null;
          this.onSignup();
        }
      },
      onLogin: function(account, password) {
        const that = this;
        const params = {
          functionType: 'get',
          userID: account || this.login.account,
          password: password || this.login.password,
        };
        this.login.isLoading = true;
        $.get(userSettingApi, params).done(res => {
          console.log(res);
          that.login.isLoading = false;
          // 登入失敗
          if (res.status === 'failed') {
            if (res.errorField === 'account') {
              that.login.accountError = res.message;
            } else {
              that.login.passwordError = res.message;
            }
          // 登入成功
          } else if (res.status === 'successful') {
            const message = {
              type: 'normal',
              text: res.message,
            };
            that.setMessage(message);
            that.setLocalLoginInfo(account, password);
            this.$emit('after-login');
          }
        });
      },
      onSignup: function() {
        const that = this;
        const params = {
          functionType: 'new',
          userName: this.signup.userName,
          userID: this.signup.account,
          password: this.signup.password,
          email: this.signup.email,
        };
        this.signup.isLoading = true;
        $.get(userSettingApi, params).done(function(res) {
          console.log(res);
          that.signup.isLoading = false;
          if (res.status === 'failed') {
            if (res.errorField === 'account') {
              that.signup.accountError = res.message;
            }
          } else if (res.status === 'successful') {
            console.log('註冊成功', res);
            const message = {
              type: 'normal',
              text: res.message,
            };
            that.setMessage(message);
            that.afterSignup();
          }
        });
      },
      init: function() {
        const that = this;
        const loginInformation = JSON.parse(localStorage.getItem('login_information'));
        const now = new Date();
        let lastLoginTime = null;
        if (loginInformation) {
          if (loginInformation.rememberMe) {
            that.login.account = loginInformation.account;
            that.login.password = loginInformation.password;
            that.login.rememberMe = true;
          }
          lastLoginTime = new Date(loginInformation.lastTime);
        }
        // 登入後 8 小時內自動重新登入
        if (lastLoginTime && (parseInt(now - lastLoginTime) / 1000 / 60 / 60) < 8 && loginInformation.account && loginInformation.isLogin) {
          that.onLogin(loginInformation.account, loginInformation.password);
        } else if (loginInformation && !loginInformation.rememberMe) {
          removeItemFromLocalStorage('login_information');
        }
      },
      signupValidation: function() {
        let isPassed = true;
        const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        // Email validate
        if (this.signup.email.search(emailRule) === -1) {
          this.signup.emailError = 'Email 格式不正確';
          isPassed = false;
        }
        // Password again validate
        if (this.signup.password !== this.signup.passwordAgain) {
          this.signup.passwordError = '你確定有一樣ㄇ?';
          isPassed = false;
        }
        return isPassed;
      },
      afterSignup: function() {
        this.signup = {
          userName: null,
          account: null,
          password: null,
          passwordAgain: null,
          email: null,
          accountError: null,
          passwordError: null,
          emailError: null,
          isLoading: false,
        };
        this.active = 'login';
      },
      onKeyboardEnter: function(e) {
        const loginLoading = this.login.isLoading;
        const signupLoading = this.signup.isLoading;
        const key = e.key;
        if (loginLoading || signupLoading || this.loginBtnDisabled || this.signupBtnDisabled) return;
        if (key === 'Enter') {
          if (this.active === 'login') {
            this.onClickLogin();
          }
          if (this.active === 'signup') {
            this.onClickSignup();
          }
        }
      },
      setMessage: function(messageObj) {
        this.$emit('dialog-message', messageObj);
      },
    },
    computed: {
      loginBtnDisabled: function() {
        return this.signup.isLoading || this.active === 'login' && (!this.login.account || !this.login.password || this.login.isLoading);
      },
      signupBtnDisabled: function() {
        return this.login.isLoading || this.active === 'signup' &&
              (!this.signup.account || !this.signup.password || !this.signup.userName || !this.signup.passwordAgain || !this.signup.email || this.signup.isLoading);
      },
    },
  }
</script>
