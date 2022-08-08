<!-- code demo wrapper -->
<template>
  <CodeDemo :code="code">
    <Demo />
  </CodeDemo>
</template>

<script>
  import CodeDemo from '../components/CodeDemo.vue'
  /*__import__*/

  export default {
    components: {
      CodeDemo,
      /*__demo__*/
    },
    data() {
      return {
        code,
      }
    },
  }
</script>
