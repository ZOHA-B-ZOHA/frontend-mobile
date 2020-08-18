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
      <div class="label">나의 쿠폰<button id="guide" @click="showRewardGuideModal">사용방법</button></div>
      <div class ="label sub">*쿠폰은 느티나무 도서관점, 동원관점, 자하연점, 137동점에서 사용가능합니다.</div>
      <div class ="label sub" style="margin-bottom: 10px;">*쿠폰은 지급된 이후로 2주일간 사용 가능합니다. 쿠폰을 눌러서 확인해 주세요.</div>
      <div class="btn-main content rewardContainer">
        <Reward v-if="rewards.firstRoundPlus" type="firstRoundPlus" :status="rewards.firstRoundPlus" v-on:triggerModal="showRedeemModal" />
        <Reward v-if="rewards.firstRoundFree" type="firstRoundFree" :status="rewards.firstRoundFree" v-on:triggerModal="showRedeemModal" />
        <Reward v-if="rewards.secondRoundPlus" type="secondRoundPlus" :status="rewards.secondRoundPlus" v-on:triggerModal="showRedeemModal" />
        <Reward v-if="rewards.secondRoundFree" type="secondRoundFree" :status="rewards.secondRoundFree" v-on:triggerModal="showRedeemModal" />
        <div v-if="catchError" style="grid-column: 1 / 3; line-height: 24px;">오류가 발생해서 쿠폰 목록을 가져 오지 못했습니다.</div>
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
      catchError: false,
    };
  },
  created: function() {
    axios.post('https://zohabzoha.com/api/rewards', { phoneNumber: this.user.phoneNumber })
    .then((response) => {
      this.rewards = response.data.rewards;
    })
    .catch(() => {
      this.catchError = true;
    })
  },
  methods: {
    showRewardGuideModal: function() {
      this.modalQuery = { noButton: true };
      this.modalType = 'rewardGuide';
      this.isModalVisible = true;
    },
    showRedeemModal: function(rewardType) {
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
        this.rewards = response.data.rewards;
        this.isModalVisible = false;
      })
      .catch(() => {
        this.modalType = 'gotError';
        this.isModalVisible = true;
      });
    },
  },
}
</script>

<style scoped>
.btn-main.content {
  height: fit-content;
  padding: 12px;
  text-align: left;
  background: none;
  border: 1.2px solid #FFFFFF;
  box-sizing: border-box;
  color: white;
  margin-bottom: 20px;
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
.sub {
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 6px;
}
#guide {
  border: none;
  background-color: white;
  color: #B42828;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: 2px;
  margin-left: 8px;
  font-size: 12px;
}
</style>
