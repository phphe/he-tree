<template lang="pug">
teleport(to="body" v-if="visible")
  .page-progress-bar.relative.fixed.top-0.w-full.left-0
    div(class="overflow-hidden h-1 mb-4 text-xs flex bg-primary-200")
      div(:style="{width: progress * 100 + '%'}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    // components: {},
    // props: {},
    data() {
      return {
        visible: false,
        progress: 0,
      }
    },
    created() {
      let loadedOnce = false
      this.$router.afterEach((to, from, failure) => {
        if (loadedOnce) {
          this.complete()
        } else {
          loadedOnce = true
          this.$router.beforeEach((to, from) => {
            this.show()
          })
        }
      })
    },
    // computed: {},
    // watch: {},
    methods: {
      show() {
        clearTimeout(this._tm2)
        const action = () => {
          if (this.progress < 0.95) {
            this.visible = true
            this._tm = setTimeout(() => {
              this.progress += 0.05
              action()
            }, Math.random() * 200 + 10)
          }
        }
        action()
      },
      complete() {
        clearTimeout(this._tm)
        this.progress = 1
        this._tm2 = setTimeout(() => {
          this.visible = false
        }, 300)
      },
    },
    // mounted() {}
  })
</script>

<style lang="scss"></style>
