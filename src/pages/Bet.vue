<template>
  <div class="board" v-if="isAuth">
    <div class="checkboxes">
      <h5 class="text-dark text-h5 text-center text-weight-bold">Choose 5 numbers</h5>
      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-checkbox
            v-for="index in 30"
            :key="index"
            :disable="selection.length === 5"
            v-model="selection"
            :val="index"
            :label="JSON.stringify(index)"
            color="orange"
          />
        </div>
      </div>
    </div>
    <div class="selected">
      <h5 class="text-dark text-h5 text-weight-bold q-mb-md">Selected Numbers</h5>
      <div class="box column q-px-sm">
        <div v-for="(item, index) in selection" :key="index" class="q-gutter-sm">
          <h4 class="text-h4">{{ item }}</h4>
        </div>
      </div>
      <div class="actions">
        <q-btn :disable="selection.length < 5" color="positive" @click="onSubmit"> Start </q-btn>
        <q-btn :disable="selection.length < 1" color="primary" @click="onRemove"> Remove </q-btn>
        <q-btn :disable="selection.length < 1" color="negative" @click="onReset"> Reset </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  setup () {
    const selection = ref([])

    // Get Current User from State
    const router = useRouter()
    const store = useStore()
    const isAuth = computed(() => store.getters.getIfIsAuth)

    const onSubmit = () => {
      store.dispatch('setNums', selection.value)
      router.push({ name: 'Draw', params: { SelectedNums: selection.value } })
    }

    const onReset = () => {
      selection.value = []
    }

    const onRemove = () => {
      selection.value.splice(-1, 1)
    }

    return {
      isAuth,
      selection,
      onSubmit,
      onReset,
      onRemove
    }
  }
})
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px;
  .checkboxes {
    max-width: 500px;
    margin: 50px;
    h5{
      letter-spacing: 1px;
      text-shadow: 0 0 1px $dark, 0 0 1px $dark;
      text-decoration: underline;
    }
  }
}

.selected {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  h5{
    letter-spacing: 1px;
    text-shadow: 0 0 1px $dark, 0 0 1px $dark;
    text-decoration: underline;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    button {
      margin: 5px;
    }
  }
  .box {
    border: 3px solid $dark;
    border-color: $primary;
    border-radius: 15px;
    padding: 20px;
  }
}
</style>
