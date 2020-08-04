<template>
  <main>
    <GaugeBar :achievement="achievement" />
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
import GaugeBar from '../components/GaugeBar';

export default {
  name: 'Home',
  components: {
    GaugeBar,
  },
  props: {
    user: Object,
    achievement: Number,
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
