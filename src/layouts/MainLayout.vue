<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary">
        <EssentialLink
          class="flex flex-center"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-toolbar-title class="text-center">
        </q-toolbar-title>

        <div v-if="isAuth" class="q-pa-md">
          <q-btn-dropdown push color="pink" label="profile" dropdown-icon="change_history">
            <q-list class="q-pa-md">
              <div class="column items-center">
                <q-avatar size="80px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ loggedUser.email.split('@')[0] }}
                </div>
                <q-btn
                  push
                  @click="logout"
                  color="negative"
                  label="Logout"
                  size="sm"
                  v-close-popup
                />
              </div>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    icon: 'home',
    title: 'Home',
    link: '/'
  },
  {
    icon: 'casino',
    title: 'Bet',
    link: '/bet'
  },
  {
    icon: 'history',
    title: 'History',
    link: '/history'
  }
]

import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    // Get Current User from State
    const store = useStore()
    const router = useRouter()
    const isAuth = computed(() => store.getters.getIfIsAuth)
    const loggedUser = computed(() => store.getters.getUser)

    // Logout Usser
    const logout = () => {
      store.dispatch('setUser', null)
      store.dispatch('setAuth', false)
      store.dispatch('setNums', null)
      router.push('/login')
    }

    return {
      essentialLinks: linksList,
      isAuth,
      loggedUser,
      logout
    }
  }
})
</script>
