<template>
  <q-item class="flex flex-center menu" clickable tag="a" :to="link" active-class="active-link">
    <q-item-section v-if="icon" class="flex flex-center" avatar>
      <q-icon :name="icon" class="text-center" />
      <span class="text-center text-caption">{{title}}</span>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    link: {
      type: String,
      default: '#'
    },
    title: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.active-link{
  color: $secondary;
  background: $primary;
}
.menu{
  border-radius: 20px;
  &:active{
    transform: scale(0.95);
  }
}
</style>
