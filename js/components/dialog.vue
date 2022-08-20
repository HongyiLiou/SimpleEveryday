<template>
  <div class="dialogContainer" v-if="messages.length > 0">
    <div
      class="dialog"
      v-for="(message, index) in messages"
      :class="{ 'hide': message.hide, 'warn': message.type === 'warn', 'alert': message.type === 'alert' }"
      :style="{ 'bottom': getBottomDistance(message) }"
      :key="'message' + index"
    >
      {{ message.text }}
      <button class="closeBtn" @click="onClickCloseBtn(index)"></button>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'dialog-component',
    props: [
      'message', // { text: String, type: 'normal' | 'warn' | 'alert' }
      'radius'
    ],
    data: function() {
      return {
        gotMessage: {},
        messages: [], // { text, type, hide }
      };
    },
    methods: {
      setMessage: function(messageObj) {
        const that = this;
        messageObj['hide'] = false;
        this.messages.push(messageObj);
        this.gotMessage = {};
        setTimeout(function() {
          const index = that.messages.indexOf(messageObj);
          that.messages[index].hide = true;
          that.$forceUpdate();
          const clearMessages = function() {
            if (that.messages.length > 0 && that.messages.every(message => message.hide)) {
              setTimeout(function() {
                that.messages.splice(0, that.messages.length);
                clearMessages();
              }, 1000);
            }
          };
          clearMessages();
        }, 7000);
      },
      getBottomDistance: function(message) {
        const visableDialogs = this.messages.filter(function(m) {
          return !m.hide;
        });
        const index = visableDialogs.indexOf(message);
        const bottomDistance = `calc(${80 * (visableDialogs.length - index - 1)}px + ${(visableDialogs.length - 1 - index) * 10}px)`;
        return bottomDistance;
      },
      onClickCloseBtn: function(index) {
        this.messages[index].hide = true;
        this.$forceUpdate();
      },
    },
    watch: {
      message: {
        deep: true,
        handler: function(newVal) {
          this.gotMessage = newVal;
          if (this.gotMessage.text) {
            this.setMessage(this.gotMessage);
          }
        }
      },
    },
  }
</script>
