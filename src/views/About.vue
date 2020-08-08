<template>
  <main>
    <section>
      <div class="label">전화번호</div>
      <div class="btn-main content">{{ user.phoneNumber }}</div>
    </section>
    <section>
      <div class="label">구매 횟수</div>
      <div class="btn-main content">
        <div>
          1차: {{ user.purchaseCount.firstRound ? user.purchaseCount.firstRound : 0 }}회
        </div>
        <div>
          2차: {{ user.purchaseCount.secondRound ? user.purchaseCount.secondRound : 0 }}회
        </div>
      </div>
    </section>
    <section>
      <div class="label">나의 쿠폰</div>
      <div class="btn-main content rewardContainer">
        <Reward type="firstRoundPlus" :status="rewards.firstRoundPlus" v-on:triggerModal="showModal" />
        <Reward type="firstRoundFree" :status="rewards.firstRoundFree" v-on:triggerModal="showModal" />
        <Reward type="secondRoundPlus" :status="rewards.secondRoundPlus" v-on:triggerModal="showModal" />
        <Reward type="secondRoundFree" :status="rewards.secondRoundFree" v-on:triggerModal="showModal" />
      </div>
    </section>
    <Modal v-if="isModalVisible" :type="modalType" :query="modalQuery" v-on:handleClick="redeem" v-on:closeModal="isModalVisible = false" />
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
  height: fit-content;
  box-sizing: border-box; /* makes padding inclusive */
  padding: 16px 0px 16px 12px;
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
