<template>
  <div class="relative code-demo">
    <div
      v-show="tab === 'demo'"
      class="not-prose border-2 border-black rounded-md p-2"
    >
      <slot />
    </div>
    <pre
      v-show="tab === 'code'"
      class="language-vue"
    ><code>{{ code }}</code></pre>
    <div class="absolute right-2 -top-8">
      <VIconMDI
        v-if="tab === 'code'"
        :icon="mdiPlayCircle"
        :size="22"
        class="cursor-pointer hover:text-primary-400"
        title="Run"
        @click.native="tab = 'demo'"
      />
      <VIconMDI
        v-if="tab === 'demo'"
        :icon="mdiCode"
        :size="22"
        class="cursor-pointer hover:text-primary-400"
        title="View Source"
        @click.native="tab = 'code'"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import { ref, PropType, defineComponent } from 'vue-demi'
  import { mdiCode, mdiPlayCircle } from 'mdi-js/filled'

  export default defineComponent({
    props: {
      code: String,
    },
    data() {
      return {
        tab: 'demo',
        mdiCode,
        mdiPlayCircle,
      }
    },
  })
</script>

<style lang="scss">
  .code-demo {
    > pre {
      margin-top: 0;
    }
  }
</style>
