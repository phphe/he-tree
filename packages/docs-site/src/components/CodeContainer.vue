<template>
  <div class="relative code-container code-container-hightlight" :style="sizeStyle">
    <div v-show="tab === 'demo' && demo" class="not-prose border-2 border-black rounded-md p-2">
      <slot />
    </div>
    <div class="relative" v-show="tab === 'code' || !demo">
      <div v-if="codeHightlight" v-html="codeHightlight"></div>
      <pre v-else><code :class="'language-' + codeLanguage">{{ code }}</code></pre>
      <div class="absolute top-1 right-3 text-center text-sm">
        <span class="ml-2 text-gray-400">{{ codeLanguage }}</span>
      </div>
    </div>
    <div class="absolute right-2 -top-8">
      <Transition v-if="!demo || tab === 'code'" name="fade" mode="out-in">
        <VIconMDI v-if="!copied" :icon="mdiContentCopy" :size="20" class="cursor-pointer hover:text-primary-400 ml-1"
          :title="$t('message.Copy')" v-tooltip="$t('message.Copy')" @click.native="copyCode()" />
        <VIconMDI v-else :icon="mdiDone" :size="22" class="text-green-400 ml-1" />
      </Transition>
      <VIconMDI v-if="demo && tab === 'code'" :icon="mdiPlayCircle" :size="22"
        class="cursor-pointer hover:text-primary-400 ml-1" :title="$t('message.Run')" v-tooltip="$t('message.Run')"
        @click.native="tab = 'demo'" />
      <VIconMDI v-if="demo && tab === 'demo'" :icon="mdiCode" :size="22"
        class="cursor-pointer hover:text-primary-400 ml-1" :title="$t('message.View Source')"
        v-tooltip="$t('message.View Source')" @click.native="tab = 'code'" />
    </div>
    <div v-if="demo && tab === 'demo'" @click="tab = 'code'"
      class="absolute right-0 bottom-0 bg-black text-white py-2 px-2 rounded text-xs cursor-pointer hover:bg-gray-600">
      {{ $t('message.View Source') }}
    </div>
    <div v-if="demo && tab === 'code'" @click="onclickBottomRun()"
      class="absolute right-1 bottom-1 bg-blue-500 text-white py-2 px-2 rounded text-xs cursor-pointer hover:bg-blue-400">
      {{ $t('message.Run') }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, nextTick } from 'vue-demi'
import {
  mdiCode,
  mdiPlayCircle,
  mdiContentCopy,
  mdiDone,
} from 'mdi-js/filled'
import * as hp from 'helper-js'
import { getHighlighterCore } from 'shikiji'
import { getWasmInlined } from 'shikiji/wasm'
import shikijiTheme from 'shikiji/themes/one-dark-pro.mjs'
const shikijiThemeName = 'one-dark-pro'

let shikiPromise = hp.promisePin()
getHighlighterCore({
  themes: [
    shikijiTheme
  ],
  langs: [
    import('shikiji/langs/vue.mjs'),
    import('shikiji/langs/typescript.mjs'),
    import('shikiji/langs/shellscript.mjs'),
  ],
  loadWasm: getWasmInlined
}).then(shiki => {
  shikiPromise.resolve(shiki)
})

const highlightMixin = defineComponent({
  data() {
    return {
      codeHightlight: null,
    }
  },
  methods: {
    async onclickBottomRun() {
      this.tab = 'demo'
      await nextTick()
      this.$el.scrollIntoView({ block: 'center' })
    }
  },
  mounted() {
    const hightlightCode = async () => {
      const shiki = await shikiPromise.promise
      this.codeHightlight = shiki.codeToHtml(this.code, { lang: this.codeLanguage, theme: shikijiThemeName })

    }
    this.$watch(
      () => [this.tab, this.code, this.demo],
      async () => {
        await this.$nextTick()
        hightlightCode()
      },
      { immediate: true }
    )
  },
})

export default defineComponent({
  mixins: [highlightMixin],
  props: {
    code: String,
    demoSize: { type: [String, Boolean], default: 'md' },
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    codeLanguage: String,
    demo: Boolean,
  },
  data() {
    return {
      tab: 'demo',
      mdiCode,
      mdiPlayCircle,
      mdiContentCopy,
      mdiDone,
      copied: false,
    }
  },
  // vue-i18n
  i18n: {
    messages: {
      en: {
        message: {
          'View Source': 'View Source',
          Run: 'Run',
          Copy: 'Copy Code',
        },
      },
      zh: {
        message: { 'View Source': '查看源码', Run: '运行', Copy: '复制代码' },
      },
    },
  },
  computed: {
    sizeStyle() {
      if (this.demo && this.tab === 'demo') {
        const sizes = { sm: 300, md: 600, lg: 1200 }
        let size
        if (this.sm) {
          size = 'sm'
        } else if (this.md) {
          size = 'md'
        } else if (this.lg) {
          size = 'lg'
        } else {
          size = this.demoSize as string
        }
        if (size && size in sizes) {
          return { 'max-width': `${sizes[size]}px` }
        }
      }
    },
  },
  methods: {
    copyCode() {
      hp.copyTextToClipboard(this.code)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 1500)
    },
  },
  mounted() { },
})
</script>

<style lang="scss">
.code-container {}
</style>
