<template>
  <main>
    <section>
      <div class="label">전화번호</div>
      <div class="content">{{ user.phoneNumber }}</div>
    </section>
    <section>
      <div class="label">구매 횟수</div>
      <div class="content">
        <div>1차: {{ user.purchaseCount.firstRound }}회</div>
        <div>2차: {{ user.purchaseCount.secondRound }}회</div>
      </div>
    </section>
    <section>
      <div class="label">나의 쿠폰</div>
      <div class="content rewardContainer">
        <Reward type="firstRoundPlus" :status="rewards.firstRoundPlus" v-on:triggerModal="showModal" />
        <Reward type="firstRoundFree" :status="rewards.firstRoundFree" v-on:triggerModal="showModal" />
        <Reward type="secondRoundPlus" :status="rewards.secondRoundPlus" v-on:triggerModal="showModal" />
        <Reward type="secondRoundFree" :status="rewards.secondRoundFree" v-on:triggerModal="showModal" />
      </div>
    </section>
    <Modal v-if="isModalVisible" :type="modalType" :query="modalQuery" v-on:handleClick="redeem" />
  </main>
</template>

<script>
import axios from 'axios';
import Reward from '../components/Reward';
import Modal from '../components/Modal';

export default {
  name: 'About',
  components: {
    Reward,
    Modal,
  },
  props: {
    user: Object
  },
  data: function() {
    return {
      rewards: {},
      isModalVisible: false,
      modalType: null,
      modalQuery: Object,
    };
  },
  created: function() {
    axios.post('https://zohabzoha.com/api/rewards', { phoneNumber: this.user.phoneNumber })
    .then((response) => {
      console.log(response)
      this.rewards = response.data.rewards;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods: {
    showModal: function(rewardType) { // rewardType
      this.modalQuery = {
        useButton: true,
        rewardType,
      };
      this.modalType = 'beforeRedeem';
      this.isModalVisible = true;
    },
    redeem: function(rewardType, phoneNumber=this.user.phoneNumber) {
      axios.post('https://zohabzoha.com/api/redeem', {
        rewardType,
        phoneNumber,
      })
      .then((response) => {
        console.log(response)
        this.rewards = response.data.rewards;
        this.isModalVisible = false;
      })
      .catch((error) => {
        console.log(error)
        this.modalType = 'gotError';
        this.isModalVisible = true;
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
  padding: 0px;
  align-items: center;
  align-content: center;
  padding-top: 20px;
}
</style>
