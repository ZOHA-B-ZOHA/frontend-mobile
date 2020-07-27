<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img alt="뒤로 가기" src="../assets/arrow.png" width="24" />
      </router-link>
      <div>내 정보</div>
    </header>
    <section>
      <div class="label">전화번호</div>
      <div class="content">{{ user.phoneNumber }}</div>
    </section>
    <section>
      <div class="label">적립 횟수? 구매 수량?</div>
      <div class="content">
        <div>1차: 4회</div>
        <div>2차: 3회</div>
      </div>
    </section>
    <section>
      <div class="label">나의 쿠폰</div>
      <div class="content">
        <!-- v-for 뭐 이런 거 써야 함. 아니 무조건 4개긴 한데...흠 -->
      </div>
    </section>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'About',
  props: {
    user: Object
  },
  methods: {
    // 이걸 상위 컴포넌트에서 해야 하나?
    useToken: function() {
      axios.post('', {})
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      });
    }
  },
}
</script>

<style scoped>
.content {
  width: 315px;
  border: none;
  box-sizing: border-box; /* makes padding inclusive */
  padding: 16px 0px 16px 12px;
  color: #E26C67;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 25px;
  text-align: left;
}
</style>
