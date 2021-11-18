<template>
  <q-page class="column flex flex-center">
    <img alt="Game logo" src="~assets/draw.png" style="width: 600px; height: 400px" />
    <h4 class="text-h4">Created By <span class="text-negative">Dimitris Georgiadis</span></h4>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>

<style lang="scss" scoped>
h4 {
  letter-spacing: 1px;
  text-shadow: 0 0 1px $positive, 0 0 1px $dark;
  text-decoration: underline;
  margin-top: 5px;
}
</style>
