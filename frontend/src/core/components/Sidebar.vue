
<template>
  <section v-if="isAuthed" id="nav" class="sidebar">
    <nav>
      <ul class="navbar">
        <router-link
          class="navbar__item"
          exact-active-class="navbar__item--active"
          to="/"
        >
          <li>
            Dashboard
          </li>
        </router-link>
        <router-link
          class="navbar__item"
          active-class="navbar__item--active"
          to="/clients"
        >
          <!-- <customer-icon :class-modifier="'navbar__item-icon'" /> -->
          <li>Clients</li>
        </router-link>
      </ul>
    </nav>
    <p v-if="isAuthed" @click="logout">
      Logout
    </p>
  </section>
</template>

<script lang="ts" setup>
// import CustomerIcon from '@/components/shared/icons/CustomerIcon.vue'
import LoginService from '@/services/login/loginService'
import { computed } from 'vue'
import { useAuthStore } from '../store/authStore/authStore'

const authStore = useAuthStore()

const isAuthed = computed(() => {
  return authStore.token !== ''
})

async function logout() {
  const res = await LoginService.logout()
  if (res.status === 'success') {
    authStore.logout()
    window.location.reload()
  }
}
</script>

<style lang="scss">
.sidebar {
  background: var(--color-background-tertiary);
  width: 280px;
  height: 100vh;
  padding: 30px 25px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.navbar {
  display: flex;
  flex-direction: column;

  &__item {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 20px 100px 20px 25px;
    text-decoration: none;
    transition: 250ms ease-in-out;

    &:hover {
      color: var(--color-button-primary);
    }

    &--active {
      background: var(--color-background-secondary);
      border-radius: 8px;

      &:hover {
        color: var(--color-text-primary);
      }
    }
  }

  &__item-icon {
    display: block;
    height: 26px;
    margin-right: 15px;
    width: 25px;

    path {
      transition: 250ms ease-in-out;
    }
  }
}
</style>
