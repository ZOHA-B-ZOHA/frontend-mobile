<template>
  <main>
    <GaugeBar :achievement="achievement" :justEarned="justEarned" />
    <nav v-if="user">
      <!-- <router-link v-if="achievement < 1" to="/earn" class="btn-main">적립하기</router-link> -->
      <router-link to="/earn" class="btn-main">적립하기</router-link>
      <router-link to="/about" class="btn-main">마이페이지</router-link>
    </nav>
    <section v-else>
      <form @submit.prevent="handleSubmit">
        <label for="phoneNumber" class="label">전화번호 입력</label>
        <p><img width="12" src="../assets/icon_alert.png" alt="주의" />전화번호 입력 시 개인정보 수집에 동의하는 것으로 간주됩니다.<br />개인정보는 리워드 지급에만 사용되며, 이벤트 종료 후 한 달 이내로 파기합니다.</p>
        <div>
          <input id="phoneNumber" class="btn-main" type="text" name="phoneNumber" placeholder="예) 01012345678" pattern="(01\d){1}\d{3,4}\d{4}" maxlength="11" required />
          <button type="submit" class="btn-main">확인</button>
        </div>
      </form>
      <Modal v-if="isModalVisible" type="gotError" v-on:getError="showModal" />
    </section>

  </main>
</template>

<script>
import GaugeBar from '../components/GaugeBar';
import Modal from '../components/Modal';

export default {
  name: 'Home',
  components: {
    GaugeBar,
    Modal,
  },
  props: {
    user: Object,
    achievement: Number,
    justEarned: Boolean,
  },
  data: function() {
    return {
      rankings: null,
      isModalVisible: false,
    };
  },
  created: function() {
    if (this.justEarned) {
      console.log('just earned');
      // 애니메이션 시간 동안,,,,,
      setTimeout(this.updateJustEarned, 1000);
    }
  },
  methods: {
    handleSubmit: function(e) {
      this.$emit('getPhoneNumber', e.target.phoneNumber.value) // e.target.elements.phoneNumber.value
    },
    showModal: function() {
      this.isModalVisible = true;
    },
    updateJustEarned: function() {
      this.$emit('updateJustEarned', false);
    },
  },
};
</script>

<style scoped>
nav {
  padding-top: 14px;
}
nav a:last-child {
  margin-bottom: 35px;
}
form button {
  margin-bottom: 35px;
}
p {
  width: 315px;
  margin-top: 0px;
  color: white;
  font-size: 10px;
  text-align: left;
  margin-bottom: 12px;
}
img {
  vertical-align: -30%;
  margin-right: 2px;
}
div {
  display: flex;
  /* width: 315px; */
}
input {
  width: 215px;
}
button {
  width: 100px;
}
</style>
