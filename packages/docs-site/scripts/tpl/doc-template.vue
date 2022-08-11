<template>
  <div class="docs-view">
    <div class="article mt-14 mb-8 prose">
      <!-- :template -->
    </div>
  </div>
</template>

<script>
  import docsSubmenu from '../docsSubmenu'
  import { onBeforeUnmount, getCurrentInstance } from 'vue'
  import { useTitle } from '../HTMLHead'
  import DocTemplateBase from '../parts/DocTemplateBase.vue'
  import CodeContainer from '../components/CodeContainer.vue'

  export default {
    extends: DocTemplateBase,
    components: {
      CodeContainer,
      /*__components__*/
    },
    setup() {
      const vm = getCurrentInstance()
      const data = ':data' || {}
      useTitle(data.name, vm)
      docsSubmenu.value = data.children || []
      onBeforeUnmount(() => {
        docsSubmenu.value = null
      })
    },
  }
</script>
