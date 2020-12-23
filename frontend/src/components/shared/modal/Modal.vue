
<template>
  <div
    class="modal fade"
    :class="(extraClasses ? extraClasses : '') + (animateModal ? ' show' : '')"
    v-bind:style="showModal ? 'display: block' : ''"
    :id="modalId"
    tabindex="-1"
    role="dialog"
    v-if="showModal"
    @click="backdropClick($event)"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="{'modal-lg' : modalSize == 'lg', 'modal-md' : modalSize == 'md', 'modal-sm' : modalSize == 'sm', 'modal-xl' : modalSize == 'xl','modal-dialog--no-background' : noBackground}"
      role="document"
      :id="modalId + '-dialog'"
    >
      <div class="modal-content">
        <slot :close="closeModal"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class Modal extends Vue {
  @Prop() modalId!: string;
  @Prop() modalSize!: string;
  @Prop({ default: true }) backdrop!: string | boolean;
  @Prop({ default: true }) keyboard!: boolean;
  @Prop({ default: false }) noBackground!: boolean
  @Prop() extraClasses!: string
}
</script>
