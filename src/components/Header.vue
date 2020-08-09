<template>
  <header>
    <!-- header left -->
    <button v-if="$route.name === 'Home'" @click="getUpdatedAchievement" class="icon-wrapper">
      <img id="refresh" alt="새로고침" src="../assets/images/icons/refresh.svg" width="50" height="50" />
    </button>
    <a v-else-if="$route.name === 'Earn' || $route.name === 'Verification' || $route.name === 'About'" @click="$router.go(-1);" class="icon-wrapper">
      <img id="back" alt="뒤로 가기" src="../assets/images/icons/arrow.svg" width="24" />
    </a>
    <div v-else class="fake"></div>
    <!-- header center -->
    <img v-if="$route.name === 'Home'" alt="조합조하 로고" id="logo" src="../assets/images/icons/logo.svg" width="100" />
    <div v-else-if="$route.name === 'Earn'">적립하기</div>
    <div v-else-if="$route.name === 'About'">내 정보</div>
    <div v-else-if="$route.name === 'Verification'">QR코드 인증하기</div>
    <!-- header right -->
    <button v-if="$route.name === 'Home' && user" @click="toggleRanking" class="icon-wrapper">
      <img id="btn-ranking" alt="" src="../assets/images/icons/ranking.svg" width="50" height="50" />
    </button>
    <div v-else class="fake"></div>
    <!-- ranking -->
    <Ranking v-if="isRankingVisible" :phoneNumber="user.phoneNumber" v-on:closeRanking="toggleRanking" />
  </header>
</template>

<script>
import Ranking from './Ranking';

export default {
  name: 'Header',
  components: {
    Ranking,
  },
  props: {
    user: Object,
  },
  data: function() {
    return {
      isRankingVisible: false,
    };
  },
  methods: {
    toggleRanking: function() {
      this.isRankingVisible = this.isRankingVisible ? false : true;
    },
    getUpdatedAchievement: function() {
      this.$emit('getUpdatedAchievement');
    },
  },
}
</script>

<style scoped>
header {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon-wrapper {
  background: none;
  outline: none;
  border: none;
  padding: 0px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-wrapper:active {
  box-shadow: none;
}
#logo {
  margin-top: 4px;
}
#refresh {
  margin-left: 28px;
  margin-top: 16px;
}
#btn-ranking {
  margin-right: 28px;
  margin-top: 16px;
}
#back {
  margin-left: 12px;
  margin-bottom: 2px;
}
header div {
  font-size: 24px;
  color: white;
}
.fake {
  content: 'fake block';
  width: 50px;
  height:50px;
  visibility: hidden;
}
</style>
