<template>
  <div class="sidebar">
    <div class="sidebar_bg"></div>
    <div class="user_photo" :style="{backgroundImage: 'url(/images/pictureHolder.png)'}"></div>
    <ul class="sidebar_menus">
      <li :class="[menu.class, {'active': menu.active}]" v-for="(menu, index) in menus" :key="`menu_${index}`">
        {{ menu.label }}
        <span class="en">{{ menu.en }}</span>
      </li>
      <div class="divider"></div>
      <li class="settings">
        設定
        <span class="en">Settings</span>
      </li>
      <li class="logout">
        登出
        <span class="en">Log Out</span>
      </li>
    </ul>
  </div>
</template>

<script>
  module.exports = {
    name: 'home-page-component',
    props: ['position', 'show'],
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
  }
</script>
