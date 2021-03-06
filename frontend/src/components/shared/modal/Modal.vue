
<template>
  <teleport to="body">
    <section
      :class="[
        (extraClasses ? extraClasses : '') + (showModal ? ' modal--show' : ''),
        'modal fade',
        {
          'modal--lg': modalSize == 'lg',
          'modal--sm': modalSize == 'sm'
        }
      ]"
      :id="modalId"
      tabindex="-1"
      role="dialog"
      v-show="showModal"
    >
      <!-- @click="backdropClick($event)" -->
      <div
        class="modal__dialog"
        :class="{
          'modal-lg': modalSize == 'lg',
          'modal-md': modalSize == 'md',
          'modal-sm': modalSize == 'sm',
          'modal-xl': modalSize == 'xl',
          'modal__dialog--show': animate
        }"
        role="document"
        :id="modalId + '-dialog'"
        ref="modalDialog"
      >
        <div class="modal__content" ref="modalContent">
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
  modalId = prop({
    type: String,
    default: ''
  })
  modalSize = prop({
    type: String,
    default: ''
  })
  extraClasses = prop({
    type: String,
    default: ''
  })
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
  showBackdrop = false
  animate = false

  get activeModal() {
    if (this.$store.state.activeModals.includes(this.modalId)) {
      return true
    } else {
      return false
    }
  }

  toggleModal(val: boolean) {
    if (val) {
      this.showModal = true
      this.addBackdrop()
      setTimeout(() => {
        this.animate = true
      }, 100)
    } else {
      const modal = this.$refs.modalContent as HTMLElement
      modal.scrollTo(0, 0)
      this.animate = false
      setTimeout(() => {
        this.showModal = false
        this.removeBackdrop()
      }, 250)
    }
  }

  addBackdrop() {
    const modals = document.getElementsByClassName('modal')
    console.log(modals.length)
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1100;

  &__dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    transform: translate(0, -25%);
    opacity: 0;
    transition: 250ms ease-in-out;

    &--show {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  &__content {
    width: 95vw;
    background: var(--color-background-secondary);
    border-radius: 5px;
    overflow-y: scroll;
    max-height: 90vh;

    @include breakpoint.min(md) {
      max-width: 80%;
    }

    @include breakpoint.min(lg) {
      max-width: 910px;
    }
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
