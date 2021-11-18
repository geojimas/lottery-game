<template>
  <div v-if="isAuth">
    <div class="history" v-if="bets">
      <div class="q-ma-md" v-for="(bet, index) in bets" :key="index">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <h6 class="text-h6 q-ma-sm text-bold">
                User: <span class="text-negative">{{ bet.user }}</span>
              </h6>
              <q-separator />
              <div class="text-h6">
                <h6>
                  Your Bet: <span class="text-negative">{{ bet.userBet }}</span>
                </h6>
                <h6>
                  Live Bet: <span class="text-negative">{{ bet.liveBet }}</span>
                </h6>
                <h6>
                  You Find: <span class="text-negative">{{ bet.same }}</span>
                </h6>
                <h6>
                  Your Money: <span class="text-negative">{{ bet.money }}</span>
                </h6>
                <h6>
                  Your Score: <span class="text-negative">{{ bet.score }} / 5</span>
                </h6>
              </div>
            </q-card-section>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat>{{ new Date(bet.drawDate).toLocaleDateString('en-US') }}</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else class="text-center text-h4 text-bold q-mt-xl">
      <h4>No Bet History found for this user..</h4>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, defineComponent } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

export default defineComponent({
  name: 'History',
  setup () {
    const bets = ref(null)

    const store = useStore()
    const isAuth = computed(() => store.getters.getIfIsAuth)
    const user = computed(() => store.getters.getUser)

    // Get current user Bet History
    onMounted(() => {
      axios
        .get(process.env.HISTORY + `"${user.value.email}"`)
        .then(response => {
          if (Object.keys(response.data).length !== 0) bets.value = response.data
        })
        .catch(err => {
          console.log(err)
        })
    })

    return {
      isAuth,
      bets
    }
  }
})
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  margin: 30px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.my-card {
  max-width: 310px;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}
</style>
