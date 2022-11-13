<template>
  <div class="sidebar" v-if="activePage !== 'login'">
    <div class="sidebar_bg"></div>
    <div class="user_photo" :style="{backgroundImage: 'url(/images/pictureHolder.png)'}">
      <button class="photo_change_button"></button>
    </div>
    <ul class="sidebar_menus">
      <li
        :class="[menu.class, {'active': menu.active}]"
        v-for="(menu, index) in menus" :key="`menu_${index}`"
        @click="changePage(null, index)"
      >
        {{ menu.label }}
        <span class="en">{{ menu.en }}</span>
      </li>
      <div class="divider"></div>
      <li class="settings" :class="{ 'active': activePage === 'settings' }" @click="changePage('settings')">
        設定
        <span class="en">Settings</span>
      </li>
      <li class="logout" @click="changePage('login')">
        登出
        <span class="en">Log Out</span>
      </li>
    </ul>
  </div>
</template>

<script>
  module.exports = {
    name: 'home-page-component',
    props: ['activePage', 'store'],
    data: function() {
      return {
        menus: [
          { label: '首頁', en: 'Home', page: 'home', class: 'home', active: true },
          { label: '收支表', en: 'Balance Sheet', page: 'balanceSheet', class: 'balance_sheet', active: false },
          { label: '等等啦', en: 'Please Wait', page: 'wait', class: 'wait', active: false },
          { label: '還沒好', en: 'Nothing Here', page: 'wait', class: 'wait', active: false },
          { label: '下次再來', en: 'See U', page: 'wait', class: 'wait', active: false },
        ],
      };
    },
    methods: {
      changePage: function(page, index) {
        this.menus.map((menu, dataIndex) => {
          menu.active = false;
          if (dataIndex === index) {
            menu.active = true;
            this.$emit('page-change', menu.page);
          }
        });
        if (page) {
          this.$emit('page-change', page);
        }
      },
      getStore: function() {
        console.log('this.store', this.store);
      },
    },
  }
</script>
