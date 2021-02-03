
<template>
  <section class="sidebar" id="nav" v-if="isAuthed">
    <nav>
      <ul class="navbar">
        <router-link
          class="navbar__item"
          active-class="navbar__item--active"
          tag="li"
          to="/dashboard"
          >Dashboard</router-link
        >
        <router-link
          class="navbar__item"
          active-class="navbar__item--active"
          tag="li"
          to="/clients"
        >
          <customer-icon class-modifier="navbar__item-icon"></customer-icon>
          Clients</router-link
        >
      </ul>
    </nav>
    <p v-if="isAuthed" @click="logout">Logout</p>
  </section>
</template>

<style lang="scss">
.sidebar {
  background: var(--color-background-tertiary);
  flex: 0 0 280px;
  width: 280px;
}

.navbar {
  display: flex;
  flex-direction: column;
  margin: 100px 25px 0;

  &__item {
    align-items: center;
    cursor: pointer;
    display: flex;
    padding: 20px 100px 20px 25px;
    text-decoration: none;
    transition: 250ms ease-in-out;

    &:hover {
      color: var(--color-button-primary);

      .navbar__item-icon {
        path {
          fill: var(--color-button-primary);
        }
      }
    }

    &--active {
      background: var(--color-background-secondary);
      border-radius: 8px;

      &:hover {
        color: var(--color-text-primary);

        .navbar__item-icon {
          path {
            fill: var(--color-text-primary);
          }
        }
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

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CustomerIcon from '@/components/shared/icons/CustomerIcon.vue'
import LoginService from '@/services/login/login'

@Options({
  components: {
    CustomerIcon
  },
  name: 'Sidebar'
})
export default class Sidebar extends Vue {
  get isAuthed() {
    if (this.$store.state.token) {
      return true
    } else {
      return false
    }
  }

  async logout() {
    const response = await LoginService.logout()
    if (response.status === 'Success') {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>
