<template>
  <div id="app">
    <canvas id="scanner" width="300" height="300">이 브라우저는 Javascript Canvas API를 지원하지 않습니다.</canvas>
    <div id="result">result</div>
  </div>
</template>

<script>
import jsQR from 'jsqr';
console.log(jsQR)

export default {
  name: 'Verification',
  props: {
    user: Object,
  },
  data: function() {
    return {
      ctx: null,
      video: null,
    };
  },
  mounted: function() {
    const video = document.createElement("video");
    this.video = video;
    const canvas = document.getElementById('scanner'); // 또는 $ref나 $el을 사용할 수도 있다고 하네
    const ctx = canvas.getContext('2d');
    this.ctx = ctx;

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then((stream) => {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      this.scan();
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    scan: function() {
      const { ctx, video } = this;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // 여길 어떻게 해야 하지... 비디오 어떻게 자르지?
        // 일단 실제 핸드폰으로 테스트해 보기
        // 그냥 핸드폰 카메라의 가운데만 보이게 자르면 될까
        ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      // https://stackoverflow.com/questions/8771919/rangeerror-with-requestanimationframe
      // 함수에 인자를 집어넣기 위해 함수를 실행시키면 안 됨. 그래서 인자도 컴포넌트의 data로 넘김.
      // requestAnimationFrame(this.scan(ctx, video));
      requestAnimationFrame(this.scan);
    },
  },
}
</script>
