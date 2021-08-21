<template lang="pug">
.default-layout.fixed.w-full.h-full.flex
  .main-sidebar.flex-shrink-0.w-56.h-full.overflow-hidden.flex.flex-col(:class="{'fixed bg-white z-10 border-r-2': sm}" v-show="!sm || sidebarVisible")
    .text-center.p-2.bg-gray-50.pointer(v-if="sm" @click="sidebarVisible=false")
      Icon(name="arrow_back")
    .flex-grow.overflow-y-auto.overflow-x-hidden.px-4.flex.flex-col
      //- .contents-block.p-4.border-b-2(v-show="state.tableOfContents.visible")
      //-   .text-xl {{$t('Contents')}}
      //-   ul.list-decimal.pl-4.mt-1
      //-     li(v-for="item in state.tableOfContents.value")
      //-       a.text-primary-600(class='hover:text-primary-800' :href="item.url" v-anchor) {{item.text}}

      Anchor.main-title.text-2xl.text-gray-700.py-4.font-semibold(:to="{name: 'home'}")
        span {{config.APP_NAME}}
      .main-menu.mt-2.text-gray-600.h-0.flex-grow.flex.flex-col.pb-4
        DocsMenuItem.main-menu-item(:to="{path: '/v1/guide'}") {{$t('Guide')}}
        DocsMenuItem.main-menu-item(:to="{path: '/v1/api'}") {{$t('API')}}
        Anchor.main-menu-item(to="/pro-plugin") {{$t('Pro Plugin')}}
        Anchor.main-menu-item(to="/examples") {{$t('Examples')}}
        Popup.main-menu-item(caret menu hover)
          | {{$t('Languages')}}
          template(v-slot:card)
            .shadow.rounded.text-sm
              Anchor.block.py-2.px-3(class="hover:bg-gray-100" @click="switchLocale('en')") English
              Anchor.block.py-2.px-3(class="hover:bg-gray-100" @click="switchLocale('zh')") 简体中文
        Anchor.main-menu-item(to="https://github.com/phphe/he-tree") Github
        //- Anchor.main-menu-item(v-if="config.IS_DEVLOPMENT" @click="reloadRouteView()") Reload Route
    //- .flex-shrink-0.py-2.text-center
  .main-right.flex-grow.overflow-auto()
    .px-6.main-body
      router-view(:key="routeViewKey")
    //- .py-10.text-center.text-sm.text-gray-500 Copyright © {{config.APP_NAME}} {{year}}. All rights reserved.
  Btn.fixed.bottom-5.right-2(v-if="sm" color="primary" class="h-10" paddingClass="px-2" @click="sidebarVisible=!sidebarVisible")
    Icon(name="menu")
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { routeViewKey, reloadRouteView } from '../router'
  import { state } from '../store'
  import { switchLocale } from '../i18n'
  import * as hp from 'helper-js'
  import useWindowSize from '../plugins/useWindowSize'
  import config from '../config'
  import DocsMenuItem from '../parts/DocsMenuItem.vue'

  export default defineComponent({
    components: { DocsMenuItem },
    setup(props) {
      const windowSize = useWindowSize()
      const sm = computed(() => windowSize.value.innerWidth < 760)
      return { routeViewKey, reloadRouteView, sm }
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
