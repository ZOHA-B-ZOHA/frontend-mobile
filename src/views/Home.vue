<template>
  <div id="app">
    <img alt="조합이좋아 로고" src="../assets/logo.png" width="120" />
    <!-- 로고 이미지 자체에 마진이 있네... 잘라 써야 하나 -->
    <section id="gaugeBar">
      <img alt="샘플 컵 이미지" src="../assets/sample_cup.png" width="240" />
      <!-- 나중에 svg로 바꾸면 그냥 부모 section에 딱 맞게 하기 -->
    </section>
    <nav v-if="user">
      <router-link to="/earn">적립하기</router-link>
      <router-link to="/about">마이페이지</router-link>
    </nav>
    <section v-else>
      <form @submit.prevent="handleSubmit">
        <label for="phoneNumber" class="label">전화번호 입력</label>
        <input id="phoneNumber" type="text" name="phoneNumber" placeholder="01012345678" pattern="01\d\d{3,4}\d{4}" />
        <button type="submit">확인</button>
      </form>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  methods: {
    handleSubmit: function(e) {
      this.$emit('getPhoneNumber', e.target.phoneNumber.value) // e.target.elements.phoneNumber.value
    }
  },
  props: {
    user: Object,
  }
}
</script>

<style scoped>
#gaugeBar {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav a:last-child {
  margin-bottom: 35px;
}
form button {
  margin-bottom: 35px;
}
</style>
