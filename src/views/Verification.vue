<template>
  <main>
    <div class="label">*인식이 잘 되지 않을 경우 QR코드 이미지에서 조금 떨어져서 다시 촬영해 주세요.</div>
    <label for="getqrimage" class="btn-main">QR코드 다시 촬영하기</label>
    <qrcode-capture id="getqrimage" :multiple="false" @detect="onDetect" />
    <Modal v-if="isModalVisible" :type="modalType" :query="modalQuery" v-on:closeModal="isModalVisible = false" />
  </main>
</template>

<script>
import axios from 'axios';
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
        axios.post('https://zohabzoha.com/api/verify', {
          phoneNumber: this.user.phoneNumber,
          branch: this.$route.query.branch,
          purchaseQuantity: this.$route.query.quantity,
          verificationCode: process.env.VUE_APP_VERIFICATION_CODE,
        })
        .then((response) => {
          this.$emit('updateJustEarned', response.data.justEarned);
          this.$emit('getUpdatedAchievement', Math.round(Number(response.data.achievement) * 1000) / 1000);
          this.$emit('updateUserInfo', response.data.purchaseCount, response.data.purchaseQuantity);
          const purchaseCountNow = Number(response.data.purchaseCountNow);
          if (purchaseCountNow === 1) {
            this.modalType = 'firstPurchase';
            this.modalQuery = { useButton: false };
            this.isModalVisible = true;
          } else if (purchaseCountNow === 2) {
            this.modalType = 'secondPurchase';
            this.modalQuery = { useButton: false };
            this.isModalVisible = true;
          } else if (purchaseCountNow === 3) {
            this.modalType = 'thirdPurchase';
            this.modalQuery = { useButton: false };
            this.isModalVisible = true;
          } else if (purchaseCountNow >= 4) {
            this.modalType = 'fourthOrMorePurchase';
            this.modalQuery = { useButton: false };
            this.isModalVisible = true;
          } else {
            this.modalType = 'gotError';
            this.modalQuery = { useButton: false };
            this.isModalVisible = true;
          }
        })
        .catch(() => {
          this.modalType = 'gotError';
          this.modalQuery = { useButton: false };
          this.isModalVisible = true;
        });
        // try {
        //   const { content } = await promise;
        //   if (content === null) {
        //     this.modalType = 'QRNotDetected';
        //     this.modalQuery = { useButton: true };
        //     this.isModalVisible = true;
        //   } else if (content === process.env.VUE_APP_VERIFICATION_CODE) {
        //     axios.post('https://zohabzoha.com/api/verify', {
        //       phoneNumber: this.user.phoneNumber,
        //       branch: this.$route.query.branch,
        //       purchaseQuantity: this.$route.query.quantity,
        //       verificationCode: content,
        //     }, { headers: {  } })
        //     .then((response) => {
        //       console.log(response)
        //       this.$emit('updateJustEarned', response.data.justEarned);
        //       this.$emit('getUpdatedAchievement', Math.round(Number(response.data.achievement) * 1000) / 1000);
        //       this.$emit('updateUserInfo', response.data.purchaseCount, response.data.purchaseQuantity);
        //       const purchaseCountNow = Number(response.data.purchaseCountNow);
        //       if (purchaseCountNow === 1) {
        //         this.modalType = 'firstPurchase';
        //         this.isModalVisible = true;
        //       } else if (purchaseCountNow === 2) {
        //         this.modalType = 'secondPurchase';
        //         this.isModalVisible = true;
        //       } else if (purchaseCountNow === 3) {
        //         this.modalType = 'thirdPurchase';
        //         this.isModalVisible = true;
        //       } else if (purchaseCountNow >= 4) {
        //         this.modalType = 'fourthOrMorePurchase';
        //         this.isModalVisible = true;
        //       } else {
        //         this.modalType = 'gotError';
        //         this.isModalVisible = true;
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //       this.modalType = 'gotError';
        //       this.isModalVisible = true;
        //     });
        //   } else {
        //     this.modalType = 'invalidQRCode';
        //     this.modalQuery = { useButton: true };
        //     this.isModalVisible = true;
        //   }
        // } catch (error) {
        //   console.log(error);
        //   this.modalType = 'gotError';
        //   this.isModalVisible = true;
        // }
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
