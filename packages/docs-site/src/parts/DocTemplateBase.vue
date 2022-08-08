<script>
  import vheading from '../parts/vheading.vue'

  export default {
    components: { vheading },
    methods: {
      resolveHref(href) {
        return href
      },
    },
  }
  // from https://stackoverflow.com/a/2676231
  function concatAndResolveUrl(url, concat) {
    var url1 = url.split('/')
    var url2 = concat.split('/')
    var url3 = []
    for (let i = 0, l = url1.length; i < l; i++) {
      if (url1[i] == '..') {
        url3.pop()
      } else if (url1[i] == '.') {
        continue
      } else {
        url3.push(url1[i])
      }
    }
    for (let i = 0, l = url2.length; i < l; i++) {
      if (url2[i] == '..') {
        url3.pop()
      } else if (url2[i] == '.') {
        continue
      } else {
        url3.push(url2[i])
      }
    }
    return url3.join('/')
  }
</script>

<style lang="scss">
  .docs-view {
    .prose {
      max-width: unset;
    }
  }
</style>
