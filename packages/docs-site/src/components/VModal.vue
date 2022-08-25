<template>
  <Teleport
    :to="computedRenderTarget"
    v-if="readyToInsert"
    :disabled="computedRenderTarget == null"
  >
    <!-- just to wrap for transition -->
    <div>
      <transition name="fade">
        <div
          v-if="visible"
          class="Modal fixed inset-0 flex justify-center"
          :class="[
            alignCenter ? 'items-center' : 'items-baseline',
            {
              'bg-black bg-opacity-20': !noBackground,
              'pointer-events-none': noBackground,
            },
          ]"
          @click.self="onClickBackground"
        >
          <component
            :is="form ? 'form' : 'div'"
            class="ModalDialog relative"
            :class="[
              $style.dialog,
              fullscreen && $style.fullscreen,
              fullscreenForSm && $style.fullscreenForSm,
              {
                'rounded-md bg-white shadow-md': !noStyle,
                'm-0': alignCenter,
                'p-4': !noPadding,
              },
            ]"
            :style="dialogStyle"
            v-bind="$attrs"
          >
            <div class="ModalHeader mb-4 flex" v-if="title">
              <div class="ModalTitle flex-grow text-lg font-medium">
                <slot name="title">{{ title }}</slot>
              </div>
              <vClose
                v-if="!noClose"
                class="ModalClose ml-2 flex-shrink-0"
                @click="close"
              />
            </div>
            <vClose
              v-if="!noClose && !title"
              @click="close"
              class="ModalClose flex-shrink-0 absolute right-2 top-2"
            />
            <slot />
          </component>
          <div v-html="computedBodyStyle"></div></div
      ></transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
  import {
    defineComponent,
    computed,
    ref,
    reactive,
    onMounted,
    onUnmounted,
    watch,
  } from 'vue-demi'
  import * as hp from 'helper-js'
  import vClose from './vClose.vue'

  export const config = reactive({
    defaultWidth: {
      sm: 300,
      md: 600,
      lg: 900,
    },
    renderTarget: 'body',
  })

  const visibleModals = ref<number[]>([])
  const computedBodyStyle = computed(() => {
    if (visibleModals.value.length > 0) {
      return `<style>body{overflow:hidden;}</style>`
    }
  })

  export default defineComponent({
    inheritAttrs: false,
    components: { vClose },
    props: {
      modelValue: { type: Boolean, required: true },
      title: String,
      width: { type: [String, Number], default: 'md' },
      persistent: { type: Boolean }, // don't close when click outside or press esc
      alignCenter: { type: Boolean },
      fullscreen: { type: Boolean },
      noBackground: { type: Boolean },
      noClose: { type: Boolean },
      form: { type: Boolean },
      renderTarget: String,
      fullscreenForSm: { type: Boolean }, // fullscreen for small screen
      top: { type: Number, default: 80 },
      bottom: { type: Number, default: 50 },
      scroll: { type: Boolean },
      noStyle: { type: Boolean },
      noPadding: { type: Boolean },
    },
    emits: ['update:modelValue', 'open', 'close'],
    setup(props, { emit }) {
      const visible = computed(() => props.modelValue)
      const id = Math.random()
      const readyToInsert = ref(false) // to stop teleport inserted before other html such as nuxt
      setTimeout(() => {
        readyToInsert.value = true
      }, 0)
      watch(
        () => props.modelValue,
        (value, old) => {
          if (Boolean(value) === Boolean(old)) {
            return
          }
          if (value) {
            if (!visibleModals.value.includes(id)) {
              visibleModals.value.push(id)
            }
            emit('open')
          } else {
            let index = visibleModals.value.indexOf(id)
            if (index > -1) {
              visibleModals.value.splice(index, 1)
            }
            emit('close')
          }
        },
        {
          immediate: true,
        }
      )
      const dialogStyle = computed(() => {
        let style: Record<string, string>
        // width
        let r = props.width
        if (config.defaultWidth[r] != null) {
          r = config.defaultWidth[r]
        }
        style = { width: typeof r === 'string' ? r : r + 'px' }
        // max height
        if (!props.scroll) {
          style[
            'max-height'
          ] = `calc((100% - ${props.top}px) - ${props.bottom}px )`
          style.overflow = 'auto'
        }
        //
        style.margin = `${props.top}px 0 ${props.bottom}px 0`
        return style
      })
      // close by press ESC
      onMounted(() => {
        const onKeyDownEsc = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            if (!props.persistent && visible.value) {
              close()
            }
          }
        }
        hp.on(document, 'keydown', onKeyDownEsc)
        onUnmounted(() => {
          hp.off(document, 'keydown', onKeyDownEsc)
        })
      })
      //
      const computedRenderTarget = computed(() =>
        props.renderTarget === undefined
          ? config.renderTarget
          : props.renderTarget
      )
      return {
        readyToInsert,
        visible,
        dialogStyle,
        onClickBackground,
        open,
        close,
        computedBodyStyle,
        computedRenderTarget,
      }
      // methods
      function open() {
        emit('update:modelValue', true)
      }
      function close() {
        emit('update:modelValue', false)
      }
      // events
      function onClickBackground() {
        if (!props.persistent && visible.value) {
          close()
        }
      }
    },
  })
</script>

<style module lang="scss">
  .dialog {
    max-width: calc(100% - 16px);
  }

  @mixin fullscreen {
    position: fixed;
    margin: 0 !important;
    width: 100% !important;
    height: 100%;
    max-width: unset;
    top: 0;
    left: 0;
    border-radius: unset;
    max-height: 100% !important;
  }
  .fullscreen {
    @include fullscreen;
  }
  .fullscreenForSm {
    @media (max-width: 768px) {
      @include fullscreen;
    }
  }
</style>
