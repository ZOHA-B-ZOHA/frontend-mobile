<template>
  <main>
    <section>
      <label for="getqrimage">QR코드 다시 촬영하기</label>
      <qrcode-capture id="getqrimage" :multiple="false" @detect="onDetect"></qrcode-capture>
      <canvas id="preview">이 브라우저는 Javascript Canvas API를 지원하지 않습니다.</canvas>
    </section>
    <!-- <div id="result">QR코드를 인식시켜 주세요.</div> -->
    <!-- 뭔가 부가적인 설명이 더 필요할 것 같긴 하다 -->
    <!-- <section>
      <label for="qrcodeimage">QR코드 다시 촬영하기</label>
      <input id="qrcodeimage" type="file" accept="image/*" capture="environment" />
    </section> -->
    <Modal v-if="isModalVisible" :type="modalType" :query="modalQuery" />
  </main>
</template>

<script>
// import jsQR from 'jsqr';
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
    // const cameraInput = document.createElement('input');
    // cameraInput.type = 'file';
    // cameraInput.accept = 'image/*';
    // cameraInput.capture = 'environment';
    // cameraInput.onchange = this.verifyImage;
    // document.getElementsByTagName('main')[0].append(cameraInput);
    const cameraInput = document.getElementById('getqrimage');
    // cameraInput.onchange = this.verifyImage;
    cameraInput.click();
  },
  methods: {
    verifyImage: function(e) {
      // files의 이미지 개수를 하나로 제한하고 lenght를 이용해서, 1개 넘으면 처음 것만 처리.
      // 미리 안내 문구도 띄워 주기!
      const imageFile = e.target.files[0];
      const imageLastModifiedTime = imageFile.lastModified;
      const nowTime = Date.now();
      const secondGap = (nowTime - imageLastModifiedTime) / 1000; // 밀리초를 초로 변환
      if (secondGap < 10) { // 찍은 지 10초 이상이 지났으면
        this.modalType = 'imageTooOld';
        this.modalQuery = { useButton: true };
        this.isModalVisible = true;
        // 적립하기 페이지로 돌아갔을 때 지점이랑 수량이 유지되면 좋을 텐데....,,,,
      } else {
        // const canvas = document.getElementById('preview');
        // const ctx = canvas.getContext('2d');
        // const image = new Image();

        // image.onload = function() {
        //   canvas.width = image.width;
        //   canvas.height = image.height;
        //   console.log(canvas.width, canvas.height);
        //   console.log(ctx.canvas.width, ctx.canvas.height);
        //   ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
        // }
        // image.src = URL.createObjectURL(imageFile);

        // const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        // const result = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

        // if (result) {
        //   if (result === process.env.VERIFICATION_CODE) {
        //     axios.post('https://zohabzoha.com/api/verify', {
        //       phoneNumber: this.user.phoneNumber,
        //       branch: this.$route.query.branch,
        //       purchaseQuantity: this.$route.query.quantity,
        //       verificationCode: result.data
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
        // } else {
        //   this.modalType = 'QRNotDetected';
        //   this.modalQuery = { useButton: true };
        //   this.isModalVisible = true;
        // }
      }
    },
    onDetect: async function(promise) {
      const cameraInput = document.getElementById('getqrimage');
      const imageFile = cameraInput.files[0];
      const imageLastModifiedTime = imageFile.lastModified;
      const nowTime = Date.now();
      const secondGap = (nowTime - imageLastModifiedTime) / 1000; // 밀리초를 초로 변환

      if (secondGap > 10) { // 찍은 지 10초 이상이 지났으면
        this.modalType = 'imageTooOld';
        this.modalQuery = { useButton: true };
        this.isModalVisible = true;
        // 적립하기 페이지로 돌아갔을 때 지점이랑 수량이 유지되면 좋을 텐데....,,,,
      } else {
        try {
          const { content } = await promise;
          if (content === null) {
            this.modalType = 'QRNotDetected';
            this.modalQuery = { useButton: true };
            this.isModalVisible = true;
          } else if (content === process.env.VERIFICATION_CODE) {
            axios.post('https://zohabzoha.com/api/verify', {
              phoneNumber: this.user.phoneNumber,
              branch: this.$route.query.branch,
              purchaseQuantity: this.$route.query.quantity,
              verificationCode: content,
            }, { headers: {  } })
            .then((response) => {
              console.log(response)
              this.$emit('updateJustEarned', response.data.justEarned);
              this.$emit('getUpdatedAchievement', Math.round(Number(response.data.achievement) * 1000) / 1000);
              this.$emit('updateUserInfo', response.data.purchaseCount, response.data.purchaseQuantity);
              const purchaseCountNow = Number(response.data.purchaseCountNow);
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
                this.modalType = 'gotError';
                this.isModalVisible = true;
              }
            })
            .catch((error) => {
              console.log(error);
              this.modalType = 'gotError';
              this.isModalVisible = true;
            });
          } else {
            this.modalType = 'invalidQRCode';
            this.modalQuery = { useButton: true };
            this.isModalVisible = true;
          }
        } catch (error) {
          console.log(error);
          this.modalType = 'gotError';
          this.isModalVisible = true;
        }
      }
    },
  },
}
</script>

<style scoped>
#result {
  color: #ffffff;
}
label {
  width: 315px;
  height: 50px;
  border: none;
  color: #B42828; /* #E26C67; */;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  text-decoration: none;
  margin-bottom: 25px;
  line-height: 50px; /* to center the text in a tag vertically */
  font-size: 16px;
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
