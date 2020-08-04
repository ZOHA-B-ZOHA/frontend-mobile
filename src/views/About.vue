<template>
  <main>
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
      <div class="content rewardContainer">
        <Reward type="firstRoundPlus" :status="rewards.firstRoundPlus" v-on:triggerRedeem="redeem" />
        <Reward type="firstRoundFree" :status="rewards.firstRoundFree" v-on:triggerRedeem="redeem" />
        <Reward type="secondRoundPlus" :status="rewards.secondRoundPlus" v-on:triggerRedeem="redeem" />
        <Reward type="secondRoundFree" :status="rewards.secondRoundFree" v-on:triggerRedeem="redeem" />
      </div>
    </section>
  </main>
</template>

<script>
const axios = require('axios');
import { api_rewards, api_redeem } from '../../fakeData';
import Reward from '../components/Reward';

export default {
  name: 'About',
  components: {
    Reward,
  },
  props: {
    user: Object
  },
  data: function() {
    return {
      rewards: {},
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
    redeem: function(rewardType, phoneNumber=this.user.phoneNumber) {
      axios.post(`${process.env.VUE_APP_URL}/redeem`, {
        rewardType,
        phoneNumber,
      })
      .then((response) => {
        console.log(response)
        this.rewards = response.data.rewards;
      })
      .catch((error) => {
        console.log(error)
        this.rewards = api_redeem.response.data.rewards;
      });
    },
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
.rewardContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
