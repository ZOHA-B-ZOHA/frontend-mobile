<template>
  <div id="background">
    <div id="modal">
      <p>{{ bodyText }}</p>
      <button v-if="query && query.useButton" @click="handleClick">{{ buttonText }}</button>
      <router-link v-else :to="{ path, query }">{{ buttonText }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    type: String,
    query: Object,
  },
  data: function() {
    return {
      path: '',
      bodyText: '',
      buttonText: '',
    };
  },
  created: function() {
    switch (this.type) {
      case 'beforeVerification':
        this.path = '/verify';
        this.bodyText =
          `구매 지점: ${this.query.branch}\n구매 수량: ${this.query.quantity}\n\n픽업 코너에서 구매하신 물품을 받으면서 QR코드를 촬영해 주세요.\n\n*이미지 파일을 업로드하실 경우,\nQR코드의 이전 촬영본이 있더라도 새로 찍어주세요.`;
        this.buttonText = 'QR코드 촬영하기';
        break;
      case 'firstPurchase':
        this.path = '/';
        this.bodyText = '첫 구매시군요!\n이벤트에 참여해 주셔서 감사합니다.\n앞으로도 많은 참여 부탁드립니다!';
        this.buttonText = '확인';
        break;
      case 'secondPurchase':
        this.path = '/';
        this.bodyText = '두 번째 구매시군요!\n한 번만 더 구매하시면 느티나무 목표치 달성 시 사용할 수 있는 음료 1+1 쿠폰을 드려요! 앞으로도 많은 참여 부탁드립니다.';
        this.buttonText = '확인';
        break;
      case 'thirdPurchase':
        this.path = '/';
        this.bodyText = '축하드립니다!\n음료를 3번 이상 구매해 목표치 달성 시 사용 가능한 음료 1+1 쿠폰 지급 대상이 되셨습니다.\n목표치 달성까지 조금만 더 힘내주세요!';
        this.buttonText = '확인';
        break;
      case 'fourthOrMorePurchase':
        this.path = '/';
        this.bodyText = '성원에 감사드립니다. 느티나무의 목표치 달성을 위해 계속 힘을 보태 주세요!';
        this.buttonText = '확인';
        break;
      case 'beforeRedeem':
        this.bodyText = '정말 사용하시겠습니까?';
        this.buttonText = '네';
        break;
      case 'gotError':
        this.path = '/';
        this.bodyText = '오류가 발생했습니다. 메인 화면으로 돌아갑니다.';
        this.buttonText = '확인'
        break;
      case 'imageTooOld':
        this.path = '/earn';
        this.bodyText = '촬영한 지 너무 오래 지난? 이미지입니다.\n사진을 새로 촬영해 주시기 바랍니다.';
        this.buttonText = '확인';
        break;
      case 'QRNotDetected':
        this.path = '/verify';
        this.bodyText = 'QR코드를 인식하지 못했습니다.\n다시 촬영해 주시기 바랍니다.';
        this.buttonText = '확인';
        break;
      default:
        break;
    }
  },
  methods: {
    handleClick: function() {
      this.$emit('handleClick', this.query.rewardType);
    }
  }
}
</script>

<style scoped>
#background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
#modal {
  background-color: white;
  color: #B42828;
  /* margin: 0px 20px; */
  width: 275px;
  padding: 20px;
  word-break: keep-all;
}
a, button {
  display: inline-block;
  width: 235px;
  margin-top: 19px; /* p태그의 마진이 16px이라,, 35px 맞추려고 */
  margin-bottom: 16px;
  background-color: #E26C67;
  color: white;
}
p {
  white-space: pre-wrap;
}
</style>
