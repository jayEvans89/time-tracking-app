
<template>
  <teleport to="body">
    <section
      :class="[
        (extraClasses ? extraClasses : '') +
          (animateModal ? ' modal--show' : ''),
        'modal fade',
        {
          'modal--lg': modalSize == 'lg',
          'modal--sm': modalSize == 'sm',
        }
      ]"
      v-show="showModal"
      :id="modalId"
      tabindex="-1"
      role="dialog"
    >
      <!-- @click="backdropClick($event)" -->
      <div
        class="modal-dialog modal-dialog-centered"
        :class="{
          'modal-lg': modalSize == 'lg',
          'modal-md': modalSize == 'md',
          'modal-sm': modalSize == 'sm',
          'modal-xl': modalSize == 'xl',
          'modal-dialog--no-background': noBackground
        }"
        role="document"
        :id="modalId + '-dialog'"
      >
        <div class="modal-content">
          <slot :close="closeModal"></slot>
        </div>
      </div>
    </section>
    <div v-show="showBackdrop" class="modal-backdrop"></div>
  </teleport>
</template>

<script lang="ts">
import { Options, Vue, prop } from 'vue-class-component'

class Props {
  modalId!: string;
  modalSize!: string;
  extraClasses!: string
  backdrop = prop({
    type: Boolean,
    default: false
  })
  keyboard = prop({
    type: Boolean,
    default: false
  })
  noBackground = prop({
    type: Boolean,
    default: false
  })
}

@Options({
  name: 'Modal',
  watch: {
    activeModal: function(newVal) {
      this.toggleModal(newVal)
    }
  }
})
export default class Modal extends Vue.with(Props) {
  showModal = false
  animateModal = false
  showBackdrop = false

  get activeModal() {
    if (this.$store.state.activeModals.includes(this.modalId)) {
      return true
    } else {
      return false
    }
  }

  toggleModal(val: boolean) {
    if (val) {
      this.addBackdrop()
      this.showModal = true
      setTimeout(() => {
        this.animateModal = true
      }, 50)
    } else {
      this.animateModal = false
      setTimeout(() => {
        this.showModal = false
        this.removeBackdrop()
      }, 250)
    }
  }

  addBackdrop() {
    const modals = document.getElementsByClassName('modal')
    if (modals.length === 1) {
      this.showBackdrop = true
    } else {
      this.showBackdrop = false
    }
  }

  removeBackdrop() {
    const modals = document.getElementsByClassName('modal')
    if (modals.length === 1 && this.showBackdrop) {
      this.showBackdrop = false
    }
  }

  closeModal() {
    this.$store.commit('removeModal', this.modalId)
  }
}
</script>

<style lang="scss">
@use '@/styles/mixins/breakpoint' as breakpoint;

.modal {
  background: var(--color-background-secondary);
  border-radius: 5px;
  left: 50%;
  max-height: 90vh;
  opacity: 0;
  overflow-y: scroll;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -300px);
  transition: 250ms ease-in-out;
  width: 100%;
  z-index: 1100;

  @include breakpoint.min(md) {
    max-width: 80%;
  }

  @include breakpoint.min(lg) {
    max-width: 910px;
  }

  &:focus {
    outline: 0;
  }

  &--show {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  &__title {
    font-size: 40px;
    margin: 45px 0 25px;
    text-align: center;
  }

  &__subtitle {
    font-size: 30px;
    margin-bottom: 15px;
  }

  &__body {
    padding: 0 65px;
  }

  hr {
    border: 1px solid var(--color-border-primary);
    margin: 15px 0 30px;
    width: 100%;
  }

  &__button-container {
    display: flex;
    padding: 30px 65px 65px;

    @include breakpoint.min(xl) {
      padding-top: 70px;
    }

    > * {
      flex-basis: 100%;

      + * {
        margin-left: 30px;
      }
    }
  }
}

.modal-backdrop {
  background: var(--color-background-tertiary);
  height: 100vh;
  left: 0;
  opacity: 0.75;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
}
</style>
