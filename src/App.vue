<template>
  <router-view v-on:getPhoneNumber="authenticate" :user="user" />
</template>

<script>
const axios = require('axios');

export default {
  name: 'App',
  data: function() {
    return {
      user: null,
      achievement: 0,
      top10: [],
    }
  },
  created: function() {
    axios.get('')
    .then(function(response) {
      console.log(response.data)
      this.achievement
    })
    .catch(function(error) {
      console.log(error)
    });
  },
  methods: {
    authenticate: function(phoneNumber) {
      axios.post('', { phoneNumber })
      .then(function(response) {
        console.log(response)
        this.user = {
          phoneNumber: response.data.phoneNumber,

          rewards: response.data.rewards, // 객체. 토큰이 아니라 리워드나 쿠폰이라고 부르기!
        }
        this.top10 = response.data.top10 // list
        // [{ phoneNumber, quantity(구매수량) }, ...]
        // 많이 산 순서대로 정렬해서 줬으면 좋겠음
      })
      .catch(function(error) {
        console.log(error)
      });

      this.user = {
        isAuthenticated: true, // 이거 필요한가?
        phoneNumber: phoneNumber, // 아 번호도 다시 달라고 하기! 서버에서 한 번 검증을 받아야 하니까
      }
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
header::after { /* 꼼수... 도대체 이건 어떻게 해결하는 게 정석일까 */
  content: "invisible";
  width: 43px;
  height:25px;
  visibility: hidden;
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
