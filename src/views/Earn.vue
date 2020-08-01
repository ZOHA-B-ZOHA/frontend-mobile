<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img alt="뒤로 가기" src="../assets/arrow.png" width="24" />
      </router-link>
      <div>적립하기</div>
    </header>
    <form @submit.prevent="handleSubmit">
      <section>
        <label for="branch" class="label">구매 지점</label>
        <select id="branch" name="branch">
          <option value="도서관점">도서관점</option>
          <option value="137동점">137동점</option>
          <option value="자하연점">자하연점</option>
          <option value="동원관점">동원관점</option>
        </select>
      </section>
      <section>
        <label for="purchaseQuantity" class="label">구매 수량</label>
        <div id="container">
          <button @click="subtractOne">−</button>
          <input id="purchaseQuantity" type="number" min="1" v-model="quantity" />
          <button @click="addOne">+</button>
        </div>
      </section>
      <router-link to="/verify">적립하기</router-link>
    </form>
  </div>
</template>

<script>
export default {
  name: "Earn",
  data: function() {
    return {
      quantity: 1,
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
    handleSubmit: function() {
      console.log('이 부분은 아직 구현이 안 되어 있습니다~~!!')
    }
  },
  props: {
    user: Object
  }
}
</script>

<style scoped>
#container {
  width: 315px;
  display: flex;
  justify-content: space-between;
}
#container button {
  width: 50px;
  font-size: 24px;
}
#container input {
  width: 200px;
}
form {
  flex: 1;
}
form button {
  margin-top: auto;
  margin-bottom: 35px;
}
select {
  /* border-radius: 10px; */
  width: 315px;
  height: 50px;
  border: none;
  padding: 0px 10px; /* 여긴 아직 디자인이 안 나와서 내가 알아서 함 */
  /* box-sizing: border-box; makes padding inclusive */
  color: #E26C67;
  background-color: white;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 25px;
  /* font-size: 16px; */
}
option {
  width: 200px;
}
</style>
