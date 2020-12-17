
<template>
  <section class="sidebar" id="nav" v-if="isAuthed">
    <nav>
      <ul class="navbar">
        <router-link
          class="navbar__item"
          exact-active-class="navbar__item--active"
          tag="li"
          to="/"
          >Dashboard</router-link
        >
        <router-link
          class="navbar__item"
          exact-active-class="navbar__item--active"
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
  width: 330px;
}

.navbar {
  display: flex;
  flex-direction: column;
  margin: 100px 25px 0;

  &__item {
    padding: 30px 120px 30px 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
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
      border-radius: 8px;
      background: var(--color-background-secondary);

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
    margin-right: 25px;
    width: 30px;
    height: 26px;

    path {
      transition: 250ms ease-in-out;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CustomerIcon from '@/components/shared/icons/CustomerIcon.vue'
import LoginService from '@/services/login/login'

@Component({
  components: {
    CustomerIcon
  }
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
