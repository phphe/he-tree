<!-- code demo wrapper -->
<template>
  <CodeContainer :code="code" demo codeLanguage="::codeLanguage" ::attrs>
    <Demo />
  </CodeContainer>
</template>

<script>
  import CodeContainer from '../components/CodeContainer.vue'
  /*__import__*/

  export default {
    components: {
      CodeContainer,
      /*__demo__*/
    },
    data() {
      return {
        code,
      }
    },
  }
</script>
