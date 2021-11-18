<template>
  <div class="q-mt-xl row justify-center animate__animated animate__fadeInDown">
    <div class="login">
      <h4 class="text-center text-weight-bolder text-h4 q-mb-xl">Log in</h4>
      <q-form @submit.prevent="onSubmit">
        <div class="q-pa-sm">
          <q-input
            outlined
            color="dark"
            type="email"
            v-model="user.email"
            label="*Email"
            :rules="[val => !!val || 'Email is Required', isValidEmail()]"
          />
        </div>

        <div class="q-pa-sm">
          <q-input
            outlined
            color="dark"
            type="password"
            v-model="user.password"
            label="*Password"
            :rules="[val => !!val || 'Password is Required']"
          />
        </div>

        <div class="q-mt-md row justify-center">
          <q-btn push label="Login" type="submit" color="primary" />
        </div>
        <div class="q-mt-md row justify-center">
          <p>Don't have an Account ?</p>
          <router-link to="/register">Register</router-link>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import axios from 'axios'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  setup () {
    const regEmail = ref(null)
    const router = useRouter()
    const store = useStore()
    const user = reactive({
      email: null,
      password: null
    })

    const isValidEmail = () => {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(regEmail.value) || 'Invalid email format'
    }

    const onSubmit = () => {
      axios.post(process.env.LOGIN, {
        email: user.email,
        password: user.password
      }).then((response) => {
        // Dispatch Actions in store
        store.dispatch('setUser', response.data)
        store.dispatch('setAuth', true)

        router.push('/')
        Notify.create({
          position: 'bottom-right',
          message: 'Done',
          color: 'positive',
          type: 'positive'
        })
      }).catch((error) => {
        Notify.create({
          position: 'top-right',
          message: error.response.data.error.message,
          color: 'negative',
          type: 'negative'
        })
      })
    }

    return {
      user,
      isValidEmail,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  border: 2px solid $primary;
  border-radius: 30px;
  padding: 70px;
}
</style>
