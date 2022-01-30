
<template>
  <div
    :id="modalId"
    ref="modalContainer"
    class="modal fade"
    data-test-id="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'
import modalMounted from './modalMounted'

interface Props {
  /**
   * The id of the modal
   */
  modalId: string;

  /**
   * Whether the modal will be centered on the page
   */
  center?: boolean;

  /**
  * If the modal can be closed via a background click or the escape key
  */
  static?: boolean | null;

  /**
   * The size of the modal
   */
  modalSize?: string;
}

withDefaults(defineProps<Props>(), {
  center: true,
  static: null,
  modalSize: 'lg'
})

const emits = defineEmits<{
  (e: 'modal-mounted', modal: Modal, element: Element | null): void
}>()

const modalContainer = ref<Element | null>(null)
const { onModalMounted } = modalMounted(emits, modalContainer)

onMounted(() => {
  const modal = new Modal(modalContainer.value as Element)
  onModalMounted(modal)
})

</script>
