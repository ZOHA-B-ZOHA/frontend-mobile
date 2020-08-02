<template>
  <div id="background">
    <div id="modal">
      <p>{{ bodyText }}</p>
      <router-link :to="{ path, query }">{{ buttonText }}</router-link>
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
        this.bodyText = '구매하신 물품(??)을 픽업 코너에서 받으면서 QR코드를 스캔해 주세요.';
        this.buttonText = 'QR코드 스캔하기';
        break;
      case 'firstPurchase':
        this.path = '/';
        this.bodyText = '첫번째구매! 환영과 격려와 응원';
        this.buttonText = '확인';
        break;
      case 'secondPurchase':
        this.path = '/';
        this.bodyText = '한 번만 더 하면 ?? 1+1쿠폰~';
        this.buttonText = '확인';
        break;
      case 'thirdPurchase':
        this.path = '/mypage';
        this.bodyText = '목표치 다 채우면 무료 쿠폰~\n그리고 1등쿠폰도 노려보세요';
        this.buttonText = '확인';
        break;
      default:
        break;
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
}
</style>
