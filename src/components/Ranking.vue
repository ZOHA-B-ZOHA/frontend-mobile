<template>
  <div id="ranking-background">
    <div id="ranking">
      <header>
        <div id="fake"></div>
        <img alt="랭킹" src="../assets/images/icons/ranking_title.svg" />
        <button @click="close">
          <img alt="" src="../assets/images/icons/close.svg" with="20" height="20" />
        </button>
      </header>
      <p v-if="currentUserIncluded">현재 {{ currentUserIncluded }}등이시군요!</p>
      <main v-if="rankings">
        <div v-if="rankings && rankings.first" :class="{ rank: true, included: currentUserIncluded === 1 }">
          <img alt="1등" src="../assets/images/icons/ranking_first.svg" width="32" />
          <div class="purchase-num first"><span>{{ rankings.first.quantity }}</span>개</div>
          <div class="people-num first">{{ rankings.first.userPhoneNumbers.length }}명</div>
        </div>
        <div v-if="rankings && rankings.second" :class="{ rank: true, included: currentUserIncluded === 2 }">
          <img alt="2등" src="../assets/images/icons/ranking_second.svg" width="32" />
          <div class="purchase-num second"><span>{{ rankings.second.quantity }}</span>개</div>
          <div class="people-num second">{{ rankings.second.userPhoneNumbers.length }}명</div>
        </div>
        <div v-if="rankings && rankings.third" :class="{ rank: true, included: currentUserIncluded === 3 }">
          <img alt="3등" src="../assets/images/icons/ranking_third.svg" width="32" />
          <div class="purchase-num third"><span>{{ rankings.third.quantity }}</span>개</div>
          <div class="people-num third">{{ rankings.third.userPhoneNumbers.length }}명</div>
        </div>
      </main>
      <p v-else id="error">
        오류가 발생해서 랭킹을 받아 오지 못했습니다. 잠시 후에 다시 시도해 주시기 바랍니다.
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import crypto from 'crypto-browserify'; // 브라우저의 crypto랑 이름이 겹치는데 괜찮으려나....? 어쨌든 지금 오류는 안 나긴 함

export default {
  name: 'Ranking',
  props: {
    phoneNumber: String,
  },
  data: function() {
    return {
      rankings: {},
      currentUserIncluded: null,
    };
  },
  created: function() {
    axios.post('https://zohabzoha.com/api/rankings', { phoneNumber: this.phoneNumber })
    .then((response) => {
      console.log(response);
      this.rankings = response.data.rankings;

      const firstRanked = this.rankings.first.userPhoneNumbers;
      const secondRanked = this.rankings.second.userPhoneNumbers;
      const thirdRanked = this.rankings.third.userPhoneNumbers;

      for (let i=0; i<firstRanked.length; i++) {
        if (this.decryptPhoneNumber(firstRanked[i]) === this.phoneNumber) {
          this.currentUserIncluded = 1;
          break;
        }
      }
      if (!this.currentUserIncluded) {
        for (let i=0; i<secondRanked.length; i++) {
          if (this.decryptPhoneNumber(secondRanked[i]) === this.phoneNumber) {
            this.currentUserIncluded = 2;
            break;
          }
        }
      }
      if (!this.currentUserIncluded) {
        for (let i=0; i<thirdRanked.length; i++) {
          if (this.decryptPhoneNumber(thirdRanked[i]) === this.phoneNumber) {
            this.currentUserIncluded = 3;
            break;
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    decryptPhoneNumber: function(encryptedPhoneNumber) {
      const key = process.env.VUE_APP_DECRYPTION_KEY;
      console.log(key)
      const pass = crypto.createHash('sha256').update(String(key)).digest('base64').substring(0, 32);
      const iv = Buffer.from(key.slice(0, 16));
      const decipher = crypto.createDecipheriv('aes-256-cbc', pass, iv);
      let result = decipher.update(encryptedPhoneNumber, 'base64', 'utf8');
      result += decipher.final('utf8');
      console.log(result)
      return result;
    },
    close: function() {
      this.$emit('closeRanking');
    },
  },
};
</script>

<style scoped>
#ranking-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
#ranking {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 315px;
  height: 315px;
  justify-content: center;
  align-items: center;
}
header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: left;
}
#fake {
  width: 20px;
  height: 20px;
  content: 'fake block';
  visibility: hidden;
}
header button {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  margin-top: 16px;
}
p {
  margin: 0px;
  color: #B42828;
  font-size: 16px;
}
main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 200px;
  flex: none;
}
.rank {
  background-color: white;
  width: 235px;
  height: 50px;
  color: #E1696E;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 2px white solid; */
  /* margin-bottom: 20px; */
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.included {
  border: 2px #E1696E solid;
}
.rank img {
  margin-left: -8px;
}
.purchase-num {
  font-family: 'Black Han Sans';
  font-size: 16px;
}
.purchase-num span {
  font-family: 'Black Han Sans';
  font-size: 24px;
}
.people-num {
  font-size: 16px;
}
.first {
  color: #E1696E;
}
.second {
  color: #EF8D7C;
}
.third {
  color: #FFB68C;
}
#error {
  color: #B42828;
  text-align: center;
  margin: 25px;
  word-break: keep-all;
}
</style>
