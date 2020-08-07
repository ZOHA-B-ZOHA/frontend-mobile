<template>
  <header>
    <a id="back" @click="$router.go(-1);" v-if="$route.name === 'Earn' || $route.name === 'Verification' || $route.name === 'About'">
      <img alt="뒤로 가기" src="../assets/arrow.png" width="24" />
    </a>
    <div v-else class="fake left"></div>
    <img v-if="$route.name === 'Home'" alt="조합조하 로고" src="../assets/logo.png" width="100" />
    <div v-else-if="$route.name === 'Earn'">적립하기</div>
    <div v-else-if="$route.name === 'About'">내 정보</div>
    <div v-else-if="$route.name === 'Verification'">QR코드 인증하기</div>
    <button id="ranking" v-if="$route.name === 'Home'" v-bind:class="{ hidden: !user }" @click="toggleRanking">
      랭킹
      <div class="leaderBoard hidden">
        <!-- <div v-for="ranking in rankings" v-bind:key="ranking.phoneNumber">
          <div v-if="ranking.phoneNumber === user.phoneNumber">{{ ranking.purchaseQuantity }}(나)</div>
          <div v-else>{{ ranking.purchaseQuantity }}</div>
        </div> -->
        <div v-if="rankings" :class="{ userIncluded: currentUserIncluded === 'first' }">{{ rankings.first.quantity }}, {{ rankings.first.userPhoneNumbers.length }}</div>
        <div v-if="rankings" :class="{ userIncluded: currentUserIncluded === 'second' }">{{ rankings.second.quantity }}, {{ rankings.second.userPhoneNumbers.length }}</div>
        <div v-if="rankings" :class="{ userIncluded: currentUserIncluded === 'third' }">{{ rankings.third.quantity }}, {{ rankings.third.userPhoneNumbers.length }}</div>
      </div>
    </button>
    <div v-else class="fake right"></div>
  </header>
</template>

<script>
import axios from 'axios';
import crypto from 'crypto-browserify'; // 브라우저의 crypto랑 이름이 겹치는데 괜찮으려나....? 어쨌든 지금 오류는 안 나긴 함

export default {
  name: 'Header',
  props: {
    user: Object,
  },
  data: function() {
    return {
      rankings: null,
      currentUserIncluded: null,
    };
  },
  methods: {
    toggleRanking: function(e) {
      const leaderBoard = e.target.childNodes[1]; // 순서로 찾는 건 좀 불안정하긴 한데,, 의미상으로는 이게 지금 좀 더 이해하기 쉬움
      console.log(leaderBoard)
      this.getRankings();
      leaderBoard.classList.toggle('hidden');
    },
    getRankings: function() { // 랭킹 버튼을 눌렀을 때
      axios.post('https://zohabzoha.com/api/rankings', { phoneNumber: this.user.phoneNumber })
      .then((response) => {
        console.log(response);
        this.rankings = response.data.rankings;

        const firstRanked = this.rankings.first.userPhoneNumbers;
        const secondRanked = this.rankings.second.userPhoneNumbers;
        const thirdRanked = this.rankings.third.userPhoneNumbers;
        for (let i=0; i<firstRanked.length; i++) {
          if (this.decryptPhoneNumber(firstRanked[i]) === this.user.phoneNumber) {
            this.currentUserIncluded = 'first';
            break;
          }
        }
        if (!this.currentUserIncluded) {
          for (let i=0; i<secondRanked.length; i++) {
            if (this.decryptPhoneNumber(secondRanked[i]) === this.user.phoneNumber) {
              this.currentUserIncluded = 'second';
              break;
            }
          }
        }
        if (!this.currentUserIncluded) {
          for (let i=0; i<thirdRanked.length; i++) {
            if (this.decryptPhoneNumber(thirdRanked[i]) === this.user.phoneNumber) {
              this.currentUserIncluded = 'third';
              break;
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
        this.$emit('getError');
      });
    },
    decryptPhoneNumber: function(encryptedPhoneNumber) {
      const key = 'zohabzohapassword';
      const pass = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0, 32);
      const iv = Buffer.from(key.slice(0, 16));
      const decipher = crypto.createDecipheriv('aes-256-cbc', pass, iv);
      let result = decipher.update(encryptedPhoneNumber, 'base64', 'utf8');
      result += decipher.final('utf8');
      return result;
    },
  },
}
</script>

<style scoped>
header {
  width: 100%;
  height: 60px;
  margin-bottom: 24px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  /* width: 25px;
  height: 25px; */
  width: 50px;
  height: 50px;
  background: none;
  /* margin-left: 18px; */
  margin-bottom: 0px;
  line-height: 0px;
  /* cursor:  */
  filter: none;
}
a:active {
  box-shadow: none;
}
img {
  margin-top: 12px;
}
a img {
  margin-left: 18px;
}
header div {
  font-size: 24px;
  color: white;
}
#ranking {
  /* v-bind를 쓰려고 id 대신 class를 쓰기는 했는데,, */
  width: 50px;
  height: 50px;
  /* width: 21px;
  height: 25px; */
  /* 이미지는 css background로 넣기.
  근데 누를 수 있는 건 명확하게 누를 수 있다고 표시를 해 주는 게 더 좋을 듯 */
  border-radius: 50%;
  padding: 0px;
  margin: 10px 12px 0px 0px;
  /* margin-bottom: 0px;
  margin-right: 12px; */
}
.hidden {
  visibility: hidden;
}
.leaderBoard {
  color: lime;
}
/* header::after {
  content: "invisible";
  width: 43px;
  height:25px;
  visibility: hidden;
} */
.fake {
  content: 'fake block';
  /* width: 43px;
  height:25px; */
  width: 50px;
  height:50px;
  visibility: hidden;
}
.left {
  margin-left: 12px;
}
</style>
