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
        <input id="branch" list="branchList" name="" />
        <datalist id="branchList">
          <option value="도서관점" />
          <option value="137동점" />
          <option value="자하연점" />
          <option value="동원관점" />
        </datalist>
      </section>
      <section>
        <label for="purchaseQuantity" class="label">구매 수량</label>
        <div id="container">
          <button @click="subtractOne">−</button>
          <input id="purchaseQuantity" type="number" min="1" v-model="quantity" />
          <button @click="addOne">+</button>
        </div>
      </section>
      <router-link to="/verificate">적립하기</router-link>
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
form a {
  margin-top: auto;
  margin-bottom: 35px;
}
</style>
