<template>
  <div id="app">
    <header>
      <img alt="조합조하 로고" src="../assets/logo.png" width="120" />
      <!-- 로고 이미지 자체에 마진이 있네... 잘라 써야 하나 -->
      <button class="ranking" v-bind:class="{ visible: user }" @click="toggleRanking">
        랭킹
        <div class="leaderBoard">짜잔</div>
      </button>
    </header>
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
import axios from 'axios';
import { api_rankings } from '../../fakeData';

export default {
  name: 'Home',
  props: {
    user: Object,
  },
  data: function() {
    return {
      rankings: [],
    };
  },
  methods: {
    toggleRanking: function(e) {
      const leaderBoard = e.target.childNodes[1]; // 순서로 찾는 건 좀 불안정하긴 한데,, 의미상으로는 이게 지금 좀 더 이해하기 쉬움
      console.log(leaderBoard.style)
      leaderBoard.classList.toggle('visible');
    },
    handleSubmit: function(e) {
      this.$emit('getPhoneNumber', e.target.phoneNumber.value) // e.target.elements.phoneNumber.value
    },
    getRankings: function() { // 랭킹 버튼을 눌렀을 때
      axios.post(`${process.env.VUE_APP_URL}/rankings`, { phoneNumber: this.user.phoneNumber })
      .then((response) => {
        console.log(response);
        this.rankings = response.data.rankings;
      })
      .catch((error) => {
        console.log(error);
        this.rankings = api_rankings.response.data.rankings;
      });
    },
  },
};
</script>

<style scoped>
header::before { /* 꼼수... 도대체 이건 어떻게 해결하는 게 정석일까 */
  content: "invisible";
  width: 50px;
  height:50px;
  visibility: hidden;
}
.ranking {
  /* v-bind를 쓰려고 id 대신 class를 쓰기는 했는데,, */
  width: 50px;
  height: 50px;
  /* 이미지는 css background로 넣기.
  근데 누를 수 있는 건 명확하게 누를 수 있다고 표시를 해 주는 게 더 좋을 듯 */
  border-radius: 50%;
  padding: 0px;
  margin: 10px 12px 0px 0px;
  visibility: hidden;
}
.visible {
  visibility: visible;
}
.leaderBoard {
  /* leaderBoard를 id로 설정하면 visible로 먹인 클래스가 적용되지 않는다,, */
  /* visibility: hidden; */
}
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
