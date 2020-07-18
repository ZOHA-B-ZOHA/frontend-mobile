<template>
  <div id="app">
    <MainPage v-if="page === 'main'" />
    <MyPage v-else-if="page === 'my'" />
    <div id="nav-bar" v-if="isLoggedIn"> <!-- 사실 로그인은 아니고 PhoneNumner=null 이런 걸로? -->
      <button v-on:click="handlePage" value="main">메인</button>
      <button v-on:click="handlePage" value="my">마이페이지</button>
    </div>
    <div v-else>
      <label>전화번호 입력</label>
      <input />
      <button v-on:click="submit">완료?</button>
    </div>
  </div>
</template>

<script>
import MainPage from './components/MainPage.vue'
import MyPage from './components/MyPage.vue'

export default {
  name: 'App',
  components: {
    MainPage,
    MyPage
  },
  data: function() {
    return {
      isLoggedIn: false,
      page: 'main'
    }
  },
  methods: {
    submit: function() {
      this.isLoggedIn = true
    },
    handlePage: function(e) { // 이름 다른 걸로 바꾸기..!!!!!!!!!!!!
      this.page = e.target.value
      // const page = e.target.value
      // if (page === 'main') { // mainPage 이런 식으로 Page를 붙여야 하나..??
      //   this.page = 'main'
      // } else if (page === 'my') {
      //   this.page = 'my'
      // } else {
      //   console.error('invalid value')
      // }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
#nav-bar {
  height: 100px;
}
</style>
