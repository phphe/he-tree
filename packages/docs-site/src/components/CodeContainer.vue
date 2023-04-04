<template>
  <div class="relative code-container code-container-hightlight" :style="sizeStyle">
    <div v-show="tab === 'demo' && demo" class="not-prose border-2 border-black rounded-md p-2">
      <slot />
    </div>
    <div class="relative" v-show="tab === 'code' || !demo">
      <pre
        ref="pre"><slot name="code-outer"><code :class="'language-' + codeLanguage"><slot name="code">{{ code }}</slot></code></slot></pre>
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
    <div v-if="demo && tab === 'code'" @click="tab = 'demo'"
      class="absolute right-1 bottom-1 bg-blue-500 text-white py-2 px-2 rounded text-xs cursor-pointer hover:bg-blue-400">
      {{ $t('message.Run') }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from 'vue-demi'
import {
  mdiCode,
  mdiPlayCircle,
  mdiContentCopy,
  mdiDone,
} from 'mdi-js/filled'
import * as hp from 'helper-js'

const highlightjsReady = hp.promisePin()
let scriptsLoading = false
const highlightMixin = defineComponent({
  methods: {
    loadScripts() {
      if (scriptsLoading) {
        return
      }
      scriptsLoading = true
      const waitLoadScript = import('scriptjs')
      const waitLangs = Promise.all([
        import('highlight.js/lib/languages/bash'),
        import('highlight.js/lib/languages/css'),
        import('highlight.js/lib/languages/xml'),
        import('highlight.js/lib/languages/json'),
        import('highlight.js/lib/languages/javascript'),
        import('highlight.js/lib/languages/scss'),
        import('highlight.js/lib/languages/typescript'),
      ])
      import('highlight.js/styles/tomorrow-night-blue.css')
      import('highlight.js/lib/core').then(async ({ default: hljs }) => {
        const langs = await waitLangs
        const langsObj = {}
        for (const langName of [
          'bash',
          'css',
          'xml',
          'json',
          'javascript',
          'scss',
          'typescript',
        ]) {
          langsObj[langName] = langs.shift().default
          hljs.registerLanguage(langName, langsObj[langName])
        }
        hljs.registerLanguage('sh', langsObj['bash'])
        hljs.registerLanguage('vue', langsObj['xml'])
        highlightjsReady.resolve(hljs)
      })
    },
  },
  mounted() {
    this.loadScripts()
    const hightlightCode = () => {
      highlightjsReady.promise.then(async (hljs) => {
        const pre = this.$refs.pre as HTMLElement
        const code = pre?.querySelector('code') as HTMLElement
        if (code) {
          if (!hljs.getLanguage(this.codeLanguage)) {
            const scriptjs = (await import('scriptjs')).default
            const wait = hp.promisePin()
            scriptjs(
              `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/languages/${this.codeLanguage}.min.js`,
              () => {
                wait.resolve()
              }
            )
            await wait.promise
          }
          // @ts-ignore
          hljs.highlightElement(code)
        }
      })
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
      const pre = this.$refs.pre as HTMLElement
      const code = pre.querySelector('code') as HTMLElement
      hp.copyTextToClipboard(code.innerText)
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

// hightlight
.code-container-hightlight {
  pre {
    background: #002451 !important;

    code.hljs {
      padding: unset;
    }
  }
}
</style>
