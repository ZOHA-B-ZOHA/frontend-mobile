<template>
  <div class="home">
    <div>조합이좋아</div>
    <div v-if="user && user.isAuthenticated">내 번호는 {{ user.phoneNumber }}</div>
    <img alt="sample cup image" src="../assets/sample_cup.png" width="280" />
    <div v-if="user && user.isAuthenticated">
      <router-link to="/earn">적립하기</router-link> |
      <router-link to="/about">내정보확인?</router-link>
    </div>
    <div v-else>
      <label for="">~~하려면 휴대폰 번호를 입력하세요!</label>
      <form @submit.prevent="handleSubmit">
        <input type="text" name="phoneNumber" placeholder="01012345678" pattern="01\d\d{3,4}\d{4}" />
        <button type="submit">확인?</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  methods: {
    handleSubmit: function(e) {
      this.$emit('getPhoneNumber', e.target.phoneNumber.value) // e.target.elements.phoneNumber.value
    }
  },
  props: {
    user: Object,
  }
}
</script>
