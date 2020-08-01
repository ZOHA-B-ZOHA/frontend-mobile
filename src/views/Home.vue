<template>
  <main>
    <section id="gaugeBar">
      <img alt="샘플 컵 이미지" src="../assets/sample_cup.png" width="240" />
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
  </main>
</template>

<script>
export default {
  name: 'Home',
  props: {
    user: Object,
  },
  data: function() {
    return {
      rankings: null,
    };
  },
  methods: {
    handleSubmit: function(e) {
      this.$emit('getPhoneNumber', e.target.phoneNumber.value) // e.target.elements.phoneNumber.value
    },
  },
};
</script>

<style scoped>
#gaugeBar {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}
nav a:last-child {
  margin-bottom: 35px;
}
form button {
  margin-bottom: 35px;
}
</style>
