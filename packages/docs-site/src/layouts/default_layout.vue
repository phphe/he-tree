<template lang="pug">
.default-layout.fixed.w-full.h-full.flex
  .main-sidebar.flex-shrink-0.w-56.h-full.overflow-hidden.flex.flex-col(:class="{'fixed bg-white z-10 border-r-2': sm}" v-show="!sm || sidebarVisible")
    .text-center.p-2.bg-gray-50.pointer(v-if="sm" @click="sidebarVisible=false")
      VIconMDI(:icon="mdiArrowBack")
    .flex-grow.overflow-y-auto.overflow-x-hidden.px-4.flex.flex-col
      //- .contents-block.p-4.border-b-2(v-show="state.tableOfContents.visible")
      //-   .text-xl {{$t('Contents')}}
      //-   ul.list-decimal.pl-4.mt-1
      //-     li(v-for="item in state.tableOfContents.value")
      //-       a.text-primary-600(class='hover:text-primary-800' :href="item.url" v-anchor) {{item.text}}
      .title-nav.flex.items-baseline.py-4
        Anchor.main-title.text-2xl.text-gray-700.font-semibold(:to="homeUrl")
          span {{config.APP_NAME}}
        template(v-if="!versions")
        small.ml-2(v-else-if="versions.length === 1") {{version}}
        v-hover-menu.ml-2(v-else)
          small(:title="$t('Version')") {{version}} <Caret/>
          template(#popper)
            .shadow.rounded.text-sm
              Anchor.block.py-2.px-3(v-for="item in versions" class="hover:bg-gray-100" :to="item.homePath") {{$t(item.version)}}
      .main-menu.mt-2.text-gray-600.h-0.flex-grow.flex.flex-col.pb-4
        DocsMenuItem.main-menu-item(v-for="item in menu" :to="item.path") {{$t(item.text)}}
        .main-menu-item
          v-hover-menu
            span {{$t('Languages')}}<Caret/>
            template(#popper)
              .shadow.rounded.text-sm
                Anchor.block.py-2.px-3(class="hover:bg-gray-100" v-for="(text, key) in config.I18N.locales" @click="switchLocale(key)") {{text}}
        .main-menu-item
          v-hover-menu(v-if="versions && versions.length > 1")
            span {{$t('Version')}} <small>{{version}}</small><Caret/>
            template(#popper)
              .shadow.rounded.text-sm
                Anchor.block.py-2.px-3(v-for="item in versions" class="hover:bg-gray-100" :to="item.homePath") {{$t(item.version)}}
        Anchor.main-menu-item(:to="githubURL" v-if="githubURL") Github
        //- Anchor.main-menu-item(v-if="config.IS_DEVLOPMENT" @click="reloadRouteView()") Reload Route
    //- .flex-shrink-0.py-2.text-center
  .main-right.flex-grow.overflow-auto.relative()
    .px-6.main-body
      router-view(:key="routeViewKey")
    //- .py-10.text-center.text-sm.text-gray-500 Copyright © {{config.APP_NAME}} {{year}}. All rights reserved.
    .github-buttons-area.absolute.right-4.top-4.hidden(v-if="githubURL" class="sm:block")
      <github-button class="ml-2" :href="githubURL + '/subscription'" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-eye" data-size="large" data-show-count="true" aria-label="Watch phphe/he-tree on GitHub">Watch</github-button>
      <github-button class="ml-2" :href="githubURL + '/fork'" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-repo-forked" data-size="large" data-show-count="true" aria-label="Fork phphe/he-tree on GitHub">Fork</github-button>
      GithubButton( class="ml-2" :href="githubURL" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-show-count="true" data-size="large" aria-label="Star phphe/he-tree on GitHub") Star
  button.fixed.bottom-5.right-2(v-if="sm" color="primary" class="h-10 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 px-2 rounded" @click="sidebarVisible=!sidebarVisible")
    VIconMDI(:icon="mdiMenu")
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { routeViewKey, reloadRouteView } from '../router'
  import { state } from '../store'
  import { currentSubpathConfig } from '../runtimeConfig'
  import { switchLocale } from '../i18n'
  import * as hp from 'helper-js'
  import useWindowSize from '../plugins/useWindowSize'
  import config from '../config'
  import DocsMenuItem from '../parts/DocsMenuItem.vue'
  import { mdiArrowBack, mdiMenu } from 'mdi-js/filled'
  import { useRouter } from 'vue-router'
  import GithubButton from 'vue-github-button'

  export default defineComponent({
    components: { DocsMenuItem, GithubButton },
    setup(props) {
      const router = useRouter()
      const windowSize = useWindowSize()
      const sm = computed(() => windowSize.value.innerWidth < 760)
      const menu = computed(
        // @ts-ignore
        () => currentSubpathConfig.value?.menu || config.MENU || []
      )
      const versions = computed(() => {
        if (!config.VERSION) {
          return null
        }
        const versions = (config.SUBPATH || []).filter((v) => v.version)
        // @ts-ignore
        versions.push({
          version: config.VERSION,
          homePath: '/',
        })
        return versions.length > 0 ? versions : null
      })
      const version = computed({
        set(value) {
          const item = versions.value!.find((v) => v.version === value)!
          router.push(item.homePath)
        },
        get() {
          return currentSubpathConfig.value?.version || config.VERSION
        },
      })
      const homeUrl = computed(
        () => currentSubpathConfig.value?.homePath || '/'
      )
      const githubURL = computed(() =>
        config.GIT_NAME ? 'https://github.com/' + config.GIT_NAME : ''
      )
      return {
        routeViewKey,
        reloadRouteView,
        sm,
        mdiArrowBack,
        mdiMenu,
        menu,
        versions,
        version,
        homeUrl,
        githubURL,
      }
    },
    data() {
      return {
        state,
        sidebarVisible: false,
        year: new Date().getFullYear(),
        config,
      }
    },
    watch: {},
    async created() {},
    mounted() {},
    methods: {
      switchLocale(to: string) {
        switchLocale(to, this.$router, this.$route)
      },
    },
  })
</script>

<style lang="scss">
  .main-menu-item {
    @apply block mb-2 font-semibold;
    &.router-link-active {
      @apply text-primary-500 text-lg;
    }
  }
  .main-body {
    min-height: 750px;
    min-height: calc(100vh - 100px);
  }
</style>
