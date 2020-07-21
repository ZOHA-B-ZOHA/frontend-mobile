<template>
  <div id="app">
    <router-view v-on:getPhoneNumber="authenticate" :user="user" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      user: null,
    }
  },
  methods: {
    authenticate: function(phoneNumber) {
      // 서버랑 통신. 밑에는 임시 함수
      this.user = {
        isAuthenticated: true, // 이거 필요한가?
        phoneNumber: phoneNumber, // 아 번호도 다시 달라고 하기! 서버에서 한 번 검증을 받아야 하니까
      }
      console.log(this.user.isAuthenticated, this.user.phoneNumber)
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
