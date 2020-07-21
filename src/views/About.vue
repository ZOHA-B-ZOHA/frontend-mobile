<template>
  <div class="about">
    <h1>내 정보</h1>
    <div>번호: {{ user.phoneNumber }}</div>
    <div>적립 횟수</div>
    <div>1차: </div>
    <div>2차: </div>
    <div>토큰</div>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    user: Object
  }
}
</script>
