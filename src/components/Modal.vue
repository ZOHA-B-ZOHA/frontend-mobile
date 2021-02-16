<template>
  <div id="background">
    <div id="modal">
      <header v-if="type === 'beforeVerification' || type === 'beforeRedeem' || type === 'rewardGuide'">
        <button @click="close">
          <img alt="" src="../assets/images/icons/close.svg" with="20" height="20" />
        </button>
      </header>
      <p>{{ bodyText }}</p>
      <button v-if="query && query.useButton" @click="handleClick" class="btn-main">{{ buttonText }}</button>
      <div v-else-if="query && query.noButton"></div>
      <router-link v-else :to="{ path, query }" class="btn-main">{{ buttonText }}</router-link>
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
    let text1, text2;
    switch (this.type) {
      case 'beforeVerification':
        this.path = '/verify';
        this.bodyText =
          `구매 지점: ${this.query.branch}\n구매 수량: ${this.query.quantity}\n\n픽업코너에서 구매물품을 받으면서 QR코드를 촬영해 주세요.\n\n*이전 촬영본이 있더라도 새로 찍어주세요.\n\n(데모) 아무 사진이나 찍어 주시면 됩니다!😉`;
        this.buttonText = 'QR코드 촬영하기';
        break;
      case 'firstPurchase':
        this.path = '/';
        this.bodyText = '첫 구매시군요!\n참여해 주셔서 감사합니다.\n앞으로도 많은 참여 부탁드립니다!';
        this.buttonText = '확인';
        break;
      case 'secondPurchase':
        this.path = '/';
        this.bodyText = '두 번째 구매시군요!\n한 번만 더 구매하시면 목표치 달성 시 1+1 쿠폰을 드려요!\n앞으로도 많은 참여 부탁드립니다.';
        this.buttonText = '확인';
        break;
      case 'thirdPurchase':
        this.path = '/';
        this.bodyText = '축하드립니다!\n3번 이상 구매해 목표치 달성 시 1+1 쿠폰 지급 대상이 되셨습니다.\n\n목표치 달성까지 조금만 더 힘을 보태 주세요!';
        this.buttonText = '확인';
        break;
      case 'fourthOrMorePurchase':
        this.path = '/';
        this.bodyText = '성원에 감사드립니다. 1+1 쿠폰이 기다리고 있으니 느티나무의 목표치 달성을 위해 계속 힘을 보태 주세요!';
        this.buttonText = '확인';
        break;
      case 'beforeRedeem':
        switch (this.query.rewardType) {
          case 'firstRoundPlus':
            text1 = '1차 이벤트로 받은 쿠폰입니다.';
            text2 = '사용 기한: 8월 31일까지';
            break;
          case 'firstRoundFree':
            text1 = '1차 이벤트로 받은 쿠폰입니다.';
            text2 = '사용 기한: 8월 31일까지';
            break;
          case 'secondRoundPlus':
            text1 = '2차 이벤트로 받은 쿠폰입니다.';
            text2 = '사용 기한: 9월 7일까지';
            break;
          case 'secondRoundFree':
            text1 = '2차 이벤트로 받은 쿠폰입니다.';
            text2 = '사용 기한: 9월 7일까지';
            break;
            default:
              break;
        }
        this.bodyText = `[직원 확인용]\n\n${text1}\n${text2}\n\n정말 사용하시겠습니까?`;
        this.buttonText = '쿠폰 사용하기';
        break;
      case 'gotError':
        this.path = '/';
        this.bodyText = '죄송합니다. 오류가 발생했습니다.\n메인 화면으로 돌아갑니다.';
        this.buttonText = '확인'
        break;
      case 'imageTooOld':
        this.bodyText = '사용기한이 지난 이미지입니다.\n새로 촬영해 주시기 바랍니다.';
        this.buttonText = '확인';
        break;
      case 'QRNotDetected':
        this.bodyText = 'QR코드를 인식하지 못했습니다.\n다시 촬영해 주시기 바랍니다.';
        this.buttonText = '확인';
        break;
      case 'invalidQRCode':
        this.bodyText = '유효하지 않은 QR코드입니다.\n이벤트 지점에 있는 QR코드를 촬영해 주세요.';
        this.buttonText = '확인';
        break;
      case 'rewardGuide':
        this.bodyText = '<쿠폰 사용 방법>\n\n사용하고 싶은 쿠폰을 느티나무 직원 분께 보여 주세요.\n직원 분께서 직접 [쿠폰 사용하기] 버튼을 누르셔야 사용 가능합니다.\n\n(스크린샷 불가)';
        break;
      default:
        break;
    }
  },
  methods: {
    handleClick: function() {
      if (this.type === 'beforeRedeem') {
        this.$emit('handleClick', this.query.rewardType);
      } else if (this.type === 'imageTooOld' || this.type === 'QRNotDetected' || this.type === 'invalidQRCode') {
        this.$emit('closeModal');
      }
    },
    close: function() {
      this.$emit('closeModal');
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
  z-index: 3;
}
#modal {
  background-color: white;
  color: #B42828;
  width: 275px;
  padding: 20px;
  word-break: keep-all;
  text-align: center;
}
header {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}
header button {
  width: 20px;
  height: 20px;
  margin: 0px;
  border: none;
  background: none;
}
a, button {
  display: inline-block;
  width: 235px;
  margin-top: 19px; /* p태그의 마진이 16px이라,, 35px 맞추려고 */
  margin-bottom: 16px;
  background-color: #E26C67;
  color: white;
  font-size: 16px;
}
p {
  white-space: pre-wrap;
  font-size: 16px;
}
</style>
