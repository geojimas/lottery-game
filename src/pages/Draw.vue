<template>
<div v-if="isAuth">
  <div class="q-ma-md row flex flex-center">
    <q-btn
      class="q-ma-md"
      :disable="draw.length !== 5"
      @click="again"
      color="primary"
      label="Try Again"
    />
    <q-btn :disable="draw.length !== 5" @click="newDraw" color="dark" label="New Draw" />
  </div>
  <div class="draw">
    <fieldset class="main-draw">
      <legend>Live Draw</legend>
      <div v-if="draw.length" class="text-center">
        <div v-for="item in draw" :key="item" class="text-center text-h5">
          <h4 class="text-bold text-dark text-center text-h4">{{ item }}</h4>
        </div>
      </div>
    </fieldset>
    <div>
      <img v-if="draw.length < 5" alt="Spinner" src="~assets/270.gif"  width="50" />
    </div>
    <fieldset class="selected-nums">
      <legend>Your Numbers</legend>
      <div v-if="selectedNums" class="text-center">
        <div v-for="item in selectedNums" :key="item" class="text-center text-h5">
          <h4 class="text-dark text-bold text-center text-h4">{{ item }}</h4>
        </div>
      </div>
    </fieldset>
  </div>
  <div class="result">
    <fieldset class="matched-nums">
      <legend>Matched Numbers</legend>
      <div v-if="matchedNums.length" class="text-center">
        <div v-for="item in matchedNums" :key="item" class="text-center text-h5">
          <h4 class="text-bold text-positive text-center text-h4">{{ item }}</h4>
        </div>
      </div>
      <div v-else class="text-center">
        <h4 class="text-negative text-center text-bold text-h5">None</h4>
      </div>
    </fieldset>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { Notify } from 'quasar'
import { useStore } from 'vuex'

import Swal from 'sweetalert2'
import axios from 'axios'

export default defineComponent({
  name: 'Draw',
  setup () {
    const store = useStore()
    const router = useRouter()

    const isAuth = computed(() => store.getters.getIfIsAuth)
    const selectedNums = computed(() => store.getters.getNums)
    const user = computed(() => store.getters.getUser)

    const draw = ref([])
    const timesRun = ref(0)
    const score = ref(0)
    const euros = ref(0)
    const matchedNums = ref([])

    // Prevent the user to Leave the page
    onBeforeRouteLeave((to, from) => {
      if (timesRun.value !== 5) {
        return Swal.fire({
          position: 'center',
          title: 'Please Wait the Draw to finish',
          showConfirmButton: false,
          timer: 850
        })
      } else {
        return true
      }
    })

    // Draw Logic
    onMounted(() => {
      const interval = setInterval(() => {
        timesRun.value += 1
        if (timesRun.value === 5) {
          clearInterval(interval)
          for (let i = 0; i <= draw.value.length; i++) {
            for (let j = 0; j <= draw.value.length; j++) {
              if (selectedNums.value[i] === draw.value[j]) {
                matchedNums.value.push(draw.value[j])
                score.value += 1
              }
            }
          }
          Notify.create({
            message: 'Draw has been finished',
            color: 'primary',
            timeout: 2500,
            actions: [{ icon: 'close', color: 'white' }]
          })
          if (score.value >= 2) {
            if (score.value === 2) euros.value = 2.5
            else if (score.value === 3) euros.value = 5
            else if (score.value === 4) euros.value = 10
            else if (score.value === 5) euros.value = 15
            else euros.value = 0

            Swal.fire({
              title: `You Win ${euros.value} € :) `,
              text: 'Save your Bet',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Save'
            }).then(result => {
              if (result.isConfirmed) {
                axios
                  .post(process.env.DB, {
                    user: user.value.email,
                    userBet: selectedNums.value,
                    liveBet: draw.value,
                    same: matchedNums.value,
                    money: euros.value,
                    score: score.value,
                    drawDate: new Date(Date.now())
                  })
                  .then(() => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Your Bet has been Saved.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  })
                  .catch(err => {
                    Swal.fire({
                      icon: 'error',
                      title: err,
                      showConfirmButton: false,
                      timer: 1500
                    })
                  })
              }
            })
          } else {
            Swal.fire({
              position: 'center',
              title: 'You Lose :( ',
              showConfirmButton: false,
              timer: 1700
            })
          }
        }
        draw.value.push(Math.floor(Math.random() * 30) + 1)
      }, 4000)
    })

    // Play again with same bet
    const again = () => {
      window.location.reload()
    }

    // New numbers
    const newDraw = () => {
      router.push('/bet')
    }

    return {
      draw,
      isAuth,
      selectedNums,
      matchedNums,
      again,
      newDraw
    }
  }
})
</script>

<style lang="scss" scoped>
.draw {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .main-draw {
    border: 4px solid $primary;
    padding: 20px;
    border-radius: 20px;
    margin: 10px;
    font-size: 20px;
    legend{
      letter-spacing: 1px;
      text-shadow: 0 0 1px $dark, 0 0 1px $dark;
      text-decoration: underline;
    }
  }
  .selected-nums {
    border: 4px solid $negative;
    padding: 10px;
    border-radius: 20px;
    margin: 10px;
    font-size: 20px;
    legend{
      letter-spacing: 1px;
      text-shadow: 0 0 1px $dark, 0 0 1px $dark;
      text-decoration: underline;
    }
  }
}

.result {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px;

  .matched-nums {
    border: 4px solid $dark;
    padding: 10px;
    border-radius: 20px;
    margin: 10px;
    font-size: 20px;
    legend{
      letter-spacing: 1px;
      text-shadow: 0 0 1px $dark, 0 0 1px $dark;
      text-decoration: underline;
    }
  }
}

</style>
