<template>
  <div id="app">
    <template v-if="isDesktop">
      <main id="desktop">
        <div>
          <img alt="" src="./assets/images/icons/logo.svg" />
          <p>조합조하는 데스크탑 환경을 지원하지 않습니다. 모바일 환경에서 접속해 주세요.</p>
        </div>
      </main>
    </template>
    <template v-else>
      <Header
        :user="currentUser"
        v-on:getUpdatedAchievement="updateAchievement" />
      <router-view
        :user="currentUser"
        :achievement="achievement"
        :justEarned="justEarned"
        v-on:getPhoneNumber="authenticate"
        v-on:updateUserInfo="updateCurrentUser"
        v-on:updateJustEarned="updateJustEarned"
        v-on:getUpdatedAchievement="updateAchievement" />
    </template>
  </div>
</template>

<script>
import Header from './components/Header';
import { api_main, api_authenticate } from './demo-data';

export default {
  name: 'App',
  components: {
    Header,
  },
  data: function() {
    return {
      isDesktop: false,
      currentUser: null,
      achievement: 0,
      justEarned: false,
    }
  },
  created: function() {
    const desktopList = ['win16', 'win32', 'win64', 'mac', 'macintel'];
    if (desktopList.includes(navigator.platform.toLowerCase())) {
      this.isDesktop = true;
    } else {
      this.achievement = api_main.response.data.achievement;
    }
  },
  methods: {
    authenticate: function(/* phoneNumber */) {
      this.achievement = api_authenticate.response.data.achievement;
      this.currentUser = api_authenticate.response.data.currentUser;
    },
    updateCurrentUser: function(purchaseCount, purchaseQuantity) {
      this.currentUser.purchaseCount = purchaseCount;
      this.currentUser.purchaseQuantity = purchaseQuantity;
    },
    updateAchievement: function(updatedAchievement) {
      if (updatedAchievement) this.achievement = Number(updatedAchievement);
    },
    updateJustEarned: function(updatedJustEarned) {
      this.justEarned = updatedJustEarned;
    },
  }
}
</script>

<style>
@font-face {
  font-family: NanumSquareRound;
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
  font-weight: normal;
}
* {
  font-family: NanumSquareRound;
  word-break: keep-all;
}
html, body {
  margin: 0px;
  height: 100%;
}
#desktop {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
#app {
  min-height: 100%;
  text-align: center;
  background: linear-gradient(180deg, #FFB88C 0%, #DE6262 99.7%);
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
main {
  flex: 1;
  width: 100%;
}
main, section, nav, form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.label {
  width: 315px;
  text-align: left;
  color: white;
  font-size: 16px;
  line-height: 36px;
}
.btn-main {
  width: 315px;
  height: 50px;
  border: none;
  color: #B42828;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 25px;
}
input.btn-main, select.btn-main {
  padding: 0px 10px;
  box-sizing: border-box; /* makes padding inclusive */
}
input.btn-main {
  background: rgba(255, 255, 255, 0.2);
  border: 1.2px solid #FFFFFF;
  box-sizing: border-box;
  color: white;
}
input.btn-main::placeholder {
  color: white;
}
a.btn-main, button.btn-main, label.btn-main {
  text-decoration: none;
  line-height: 50px; /* to center the text in a tag vertically */
  font-size: 16px;
}
a:active, button:active, select:active {
  filter: none;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}
button:focus, select:focus, input:focus {
  outline: none;
}

/* Apple iOS Safari */
html {
  -webkit-text-size-adjust: none
}
input, button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding: 0;
}
input, button, select {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius:0;
  -webkit-appearance: none;
  margin: 0px;
  padding: 0px;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(./assets/images/icons/arrow_down.svg) no-repeat 95% 50%;
}
</style>
