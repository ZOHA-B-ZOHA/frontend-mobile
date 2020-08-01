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
        <div>1차: {{ user.purchaseQuantity.firstRound }}회</div>
        <div>2차: {{ user.purchaseQuantity.secondRound }}회</div>
      </div>
    </section>
    <section>
      <div class="label">나의 쿠폰</div>
      <div class="content">
        <div v-for="reward in rewards" v-bind:key="reward.id" :id="reward.id" @click="redeem" style="border: 1px #E26C67 dashed">
        <!-- coupon이라고 하는 게 낫나..?? 그리고 round를 키로 쓰는 건 지금 임시방편임 -->
          <div>{{ reward.round }}</div>
          <div>{{ reward.type }}</div>
          <div>{{ reward.status }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const axios = require('axios');
import { api_rewards, api_redeem } from '../../fakeData';

export default {
  name: 'About',
  props: {
    user: Object
  },
  data: function() {
    return {
      rewards: [],
    };
  },
  created: function() {
    axios.post(`${process.env.VUE_APP_URL}/rewards`, { phoneNumber: this.user.phoneNumber })
    .then((response) => {
      console.log(response);
      this.rewards = response.data.rewards;
    })
    .catch((error) => {
      console.log(error);
      this.rewards = api_rewards.response.data.rewards;
    })
  },
  methods: {
    // 이걸 상위 컴포넌트에서 해야 하나?
    redeem: function(e) {
      axios.post(`${process.env.VUE_APP_URL}/redeem`, {
        phoneNumber: this.user.phoneNumber,
        tokenId: e.target.id,
      })
      .then((response) => {
        console.log(response)
        this.rewards = response.data.rewards;
      })
      .catch((error) => {
        console.log(error)
        this.rewards = api_redeem.response.data.rewards;
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
