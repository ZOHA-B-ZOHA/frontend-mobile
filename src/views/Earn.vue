<template>
  <div class="about">
    <h1>적립하기</h1>
    <p>수량(라벨을 다른 데 달아야 하나?)</p>
    <form @submit.prevent="handleSubmit">
      <button @click="subtractOne">−</button>
      <input type="number" v-model="quantity" />
      <button @click="addOne">+</button>
      <br />
      <button type="submit">적립하기</button>
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
