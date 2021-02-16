<template>
  <main>
    <div class="label">*인식이 잘 되지 않을 경우 QR코드 이미지에서 조금 떨어져서 다시 촬영해 주세요.</div>
    <label for="getqrimage" class="btn-main">QR코드 다시 촬영하기</label>
    <qrcode-capture id="getqrimage" :multiple="false" @detect="onDetect" />
    <Modal v-if="isModalVisible" :type="modalType" :query="modalQuery" v-on:closeModal="isModalVisible = false" />
  </main>
</template>

<script>
import { api_verify } from '../demo-data';
import Modal from '../components/Modal';
import { QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Verification',
  components: {
    Modal,
    QrcodeCapture,
  },
  props: {
    user: Object,
  },
  data: function() {
    return {
      ctx: null,
      video: null,
      isModalVisible: false,
      modalType: '',
      modalQuery: null,
    };
  },
  mounted: function() {
    const cameraInput = document.getElementById('getqrimage');
    cameraInput.click();
  },
  methods: {
    onDetect: async function() {
      const cameraInput = document.getElementById('getqrimage');
      const imageFile = cameraInput.files[0];
      const imageLastModifiedTime = imageFile.lastModified;
      const nowTime = Date.now();
      const secondGap = (nowTime - imageLastModifiedTime) / 1000; // 밀리초를 초로 변환

      if (secondGap > 7) { // 찍은 지 7초 이상이 지났으면
        this.modalType = 'imageTooOld';
        this.modalQuery = { useButton: true };
        this.isModalVisible = true;
      } else {
        this.$emit('updateJustEarned', api_verify.response.data.justEarned);
        this.$emit('getUpdatedAchievement', Number(api_verify.response.data.achievement));
        this.$emit('updateUserInfo', api_verify.response.data.purchaseCount, api_verify.response.data.purchaseQuantity);
        const purchaseCountNow = api_verify.response.data.purchaseCountNow;
        if (purchaseCountNow === 1) {
          this.modalType = 'firstPurchase';
          this.isModalVisible = true;
        } else if (purchaseCountNow === 2) {
          this.modalType = 'secondPurchase';
          this.isModalVisible = true;
        } else if (purchaseCountNow === 3) {
          this.modalType = 'thirdPurchase';
          this.isModalVisible = true;
        } else if (purchaseCountNow >= 4) {
          this.modalType = 'fourthOrMorePurchase';
          this.isModalVisible = true;
        } else {
          console.log('error');
        }
      }
    },
  },
}
</script>

<style scoped>
.label {
  margin: auto 0px;
  text-align: center;
  line-height: 30px;
}
label {
  margin-bottom: 35px;
}
#getqrimage {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
}
</style>
