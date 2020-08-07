<template>
  <main>
    <form @submit.prevent>
      <section>
        <label for="branch" class="label">구매 지점</label>
        <select id="branch" class="btn-main" name="branch" v-model="branch">
          <option value="도서관점">도서관점</option>
          <option value="137동점">137동점 (언어교육원)</option>
          <option value="자하연점">자하연점</option>
          <option value="동원관점">동원관점 (경영대)</option>
        </select>
      </section>
      <section>
        <label for="quantity" class="label">구매 수량</label>
        <div id="icon-wrapper">
          <button @click="subtractOne" class="btn-main">−</button>
          <input id="quantity" class="btn-main" name="quantity" type="number" min="1" v-model="quantity" />
          <button @click="addOne" class="btn-main">+</button>
        </div>
      </section>
      <button type="submit" @click="isModalVisible = true" class="btn-main">적립하기</button>
    </form>
    <Modal v-if="isModalVisible" type="beforeVerification" :query="{ branch, quantity }" />
  </main>
</template>

<script>
import Modal from '../components/Modal';

export default {
  name: "Earn",
  components: {
    Modal,
  },
  props: {
    user: Object,
  },
  data: function() {
    return {
      branch: '도서관점',
      quantity: 1,
      isModalVisible: false,
    }
  },
  methods: {
    addOne: function(e) {
      e.preventDefault() // 왜 이게 template에서는 안 먹히는 거지?
      this.quantity++
    },
    subtractOne: function(e) {
      e.preventDefault()
      if (this.quantity > 1) this.quantity--
    },
  },
}
</script>

<style scoped>
#icon-wrapper {
  width: 315px;
  display: flex;
  justify-content: space-between;
}
#icon-wrapper button {
  width: 50px;
  font-size: 24px;
}
#icon-wrapper input {
  width: 200px;
}
form {
  flex: 1;
}
form button {
  margin-top: auto;
  margin-bottom: 35px;
}
</style>
