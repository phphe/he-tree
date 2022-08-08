import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    $broadcast(name: string, event: object) {
      event = { ...(event || {}), target: this }
      // @ts-ignore
      const walk = (vm) => {
        const listnenerName = `on_broadcast_${name}`
        const propagate = () => {
          for (const child of vm.$children) {
            walk(child)
          }
        }
        if (vm && vm[listnenerName]) {
          const newEvent = { ...event, propagate }
          vm.$emit(listnenerName, newEvent)
          vm[listnenerName](newEvent)
        } else {
          propagate()
        }
      }
      this.$emit(`broadcast_${name}`, event)
      // @ts-ignore
      for (const child of this.$children) {
        walk(child)
      }
    },
    $dispatch(name: string, event: object) {
      event = { ...(event || {}), target: this }
      // @ts-ignore
      const walk = (vm) => {
        const listnenerName = `on_dispatch_${name}`
        const propagate = () => {
          if (vm.$parent) {
            walk(vm.$parent)
          }
        }
        if (vm && vm[listnenerName]) {
          const newEvent = { ...event, propagate }
          vm.$emit(listnenerName, newEvent)
          vm[listnenerName](newEvent)
        } else {
          propagate()
        }
      }
      this.$emit(`dispatch_${name}`, event)
      if (this.$parent) {
        walk(this.$parent)
      }
    },
  },
})
