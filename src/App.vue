<template>
  <router-view v-on:getPhoneNumber="authenticate" :user="currentUser" />
</template>

<script>
import axios from 'axios';
import { api_main, api_authenticate } from '../fakeData';

export default {
  name: 'App',
  data: function() {
    return {
      currentUser: null,
      achievement: 0,
      justEarned: false,
    }
  },
  created: function() {
    axios.get(`${process.env.VUE_APP_URL}/`)
    .then((response) => {
      // not yet implemented
      console.log(response)
      this.achievement = response.data.achievement;
    })
    .catch((error) => {
      // so use fake data now
      console.log(error)
      this.achievement = api_main.response.data.achievement;
    });
  },
  methods: {
    authenticate: function(phoneNumber) {
      axios.post(`${process.env.VUE_APP_URL}/authenticate`, { phoneNumber })
      .then((response) => {
        // not yet implemented
        console.log(response)
        this.achievement = response.data.achievement;
        this.currentUser = response.data.currentUser;
      })
      .catch((error) => {
        // so use fake data now
        console.log(error)
        const data = api_authenticate.response.data;
        this.achievement = data.achievement;
        this.currentUser = data.currentUser;
      });
    }
  }
}
</script>

<style>
@font-face {
  font-family: NanumSquareRound;
  /* src: url(./assets/NanumSquareRoundR.ttf) format("ttf"); */
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
  font-weight: normal;
}
@font-face {
  font-family: NanumSquareRound;
  src: url(./assets/NanumSquareRoundB.ttf) format("ttf");
  font-weight: bold;
}
* {
  font-family: NanumSquareRound;
  /* font-weight: bold; */
}
body {
  margin: 0px;
  display: flex;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: linear-gradient(180deg, #FFB88C 0%, #DE6262 99.7%);
}
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
header {
  width: 100%;
  height: 60px;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header a {
  width: 25px;
  height: 25px;
  background: none;
  margin-left: 18px;
  margin-bottom: 0px;
  line-height: 0px;
  /* cursor:  */
  filter: none;
}
header div {
  font-size: 24px;
  color: white;
}
nav, section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
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
input {
  width: 315px;
  height: 50px;
  border: none;
  padding: 0px 10px; /* 여긴 아직 디자인이 안 나와서 내가 알아서 함 */
  box-sizing: border-box; /* makes padding inclusive */
  color: #E26C67;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 25px;
}
a, button {
  width: 315px;
  height: 50px;
  border: none;
  color: #E26C67;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  text-decoration: none;
  margin-bottom: 25px;
  line-height: 50px; /* to center the text in a tag vertically */
  font-size: 16px;
}
</style>
