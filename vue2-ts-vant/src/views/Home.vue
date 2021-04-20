<template>
  <div class="home">
    <van-button type="primary">hello</van-button>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Button } from "vant";

export default {
  name: "home",
  components: {
    [Button.name]: Button,
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
}
</style>
