<script>
  import vheading from '../parts/vheading.vue'

  export default {
    components: { vheading },
    methods: {
      resolveHref(href) {
        if (href.match(/^[\w-_]+:/)) {
          // such as mailto:
          return href
        }
        let path = href.replace('.md', '')
        if (
          !path.startsWith('/') &&
          !path.includes('//') &&
          !path.startsWith('#')
        ) {
          const dirname = this.$route.path.replace(/\/[^\/]*$/, '')
          path = concatAndResolveUrl(dirname, path)
        }
        if (path.startsWith('#')) {
          path = path.toLowerCase()
        }
        return path
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
