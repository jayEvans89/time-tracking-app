import { Modal } from 'bootstrap'
import { Ref } from 'vue'

export default function modalMounted(emit: (event: 'modal-mounted', ...args: any[]) => void, element?: Ref<Element | null>) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const onModalMounted = (modal: Modal) => {
    emit('modal-mounted', modal, element)
  }

  return {
    onModalMounted
  }
}
