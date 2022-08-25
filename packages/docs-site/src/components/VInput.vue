<template>
  <div
    class="Input inline-flex"
    :class="[{ relative: $slots.prefix || $slots.suffix }]"
    v-bind="inputVBind"
  >
    <component
      :is="textarea ? 'textarea' : 'input'"
      ref="control"
      class="InputControl w-full"
      :class="className"
      type="text"
      v-bind="inputControlVBind"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target['value'])"
    />
    <div
      class="InputdPrefix absolute left-0 top-0 flex h-full w-8 items-center justify-center"
      v-if="$slots.prefix"
    >
      <slot name="prefix" />
    </div>
    <div
      class="InputdSuffix absolute right-0 top-0 flex h-full w-8 items-center justify-center"
      v-if="$slots.suffix"
    >
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    PropType,
    computed,
    watchEffect,
    ref,
    defineComponent,
    useCssModule,
  } from 'vue-demi'

  export default defineComponent({
    inheritAttrs: false,
    props: {
      modelValue: { type: [String, Number] },
      color: {
        type: String as PropType<
          'default' | 'primary' | 'danger' | 'success' | 'warning'
        >,
        default: 'default',
      },
      size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' }, // sm, md, lg
      textarea: { type: Boolean },
    },
    setup(props, { attrs, slots }) {
      const style = useCssModule()
      const className = computed(() => {
        return [
          style.base,
          style[props.color],
          style[props.size],
          slots.prefix && style.hasPrefix,
          slots.suffix && style.hasSuffix,
        ]
      })
      // split attrs
      const inputVBind = ref<typeof attrs>()
      const inputControlVBind = ref<typeof attrs>()
      watchEffect(() => {
        const inputVBindValue = {}
        const inputControlVBindValue = {}
        for (const key of Object.keys(attrs)) {
          if (key === 'class' || key === 'style') {
            inputVBindValue[key] = attrs[key]
          } else {
            inputControlVBindValue[key] = attrs[key]
          }
        }
        inputVBind.value = inputVBindValue
        inputControlVBind.value = inputControlVBindValue
      })
      //
      return { style, className, inputVBind, inputControlVBind }
    },
    methods: {
      focus() {
        this.$refs?.control?.focus()
      },
      blur() {
        this.$refs?.control?.blur()
      },
    },
  })
</script>

<style lang="scss" module>
  .base {
    @apply rounded-sm border px-2 outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-500;
    box-sizing: content-box;
    &[type='number'] {
      @apply pr-0;
    }
  }
  .default {
    @apply border-gray-300;
  }
  .primary {
    @apply border-primary-400;
  }
  .danger {
    @apply border-danger-400 focus:border-danger-400 focus:ring-danger-400;
  }
  .success {
    @apply border-success-400 focus:border-success-400 focus:ring-success-400;
  }
  .warning {
    @apply border-warning-400 focus:border-warning-400 focus:ring-warning-400;
  }
  .sm {
    @apply px-2 text-sm leading-sm;
  }
  .md {
    @apply px-2 font-medium leading-md;
  }
  .lg {
    @apply px-3 font-medium leading-lg;
  }
  .hasPrefix {
    @apply pl-7;
  }
  .hasSuffix {
    @apply pr-7;
  }
</style>
