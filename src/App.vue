<template>
  <router-view v-on:getPhoneNumber="authenticate" :user="currentUser" />
</template>

<script>
import axios from 'axios';
import fakeData from '../fakeData';
const { main, authenticate } = fakeData;

export default {
  name: 'App',
  data: function() {
    return {
      currentUser: null,
      achievement: 0,
      top10: [],
      justEarned: false,
    }
  },
  created: function() {
    // this를 쓰려면,
    // axios 같을 걸 쓸 때는 화살표 함수를 써야 함
    // https://michaelnthiessen.com/this-is-undefined/
    // https://stackoverflow.com/questions/53657696/using-axios-in-vuejs-this-undefined
    // axios.get('')
    axios.get(`${process.env.VUE_APP_TEST_URL}/`)
    .then((response) => {
      // not yet implemented
      console.log(response)
    })
    .catch((error) => {
      // so use fake data now
      console.log(error)
      const data = main.response.data;
      this.achievement = data.achievement;
      this.justEarned = data.justEarned;

      // 이건 다른 데서 구현하는 게 나으려나
      if (this.justEarned) {
        console.log('반짝이 보여 줘야 함!');
        this.justEarned = false;
      }
    });
  },
  methods: {
    authenticate: function(phoneNumber) {
      axios.post(`${process.env.VUE_APP_TEST_URL}/athenticate`, phoneNumber)
      .then((response) => {
        // not yet implemented
        console.log(response)
      })
      .catch((error) => {
        // so use fake data now
        console.log(error)
        const data = authenticate.response.data;
        this.achievement = data.achievement;
        this.justEarned = data.justEarned;
        this.top10 = data.top10; // fakeData에 추가해야 함
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
