import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as hp from 'helper-js'

export default function () {
  const getValue = (defaultWidth = 1920, defaultHeight = 1080) => ({
    innerWidth: hp.glb().innerWidth || defaultWidth,
    innerHeight: hp.glb().innerHeight || defaultHeight,
  })
  const windowSize = ref(getValue())
  const update = () => {
    windowSize.value = getValue()
  }
  onMounted(() => {
    update()
    hp.on(window, 'resize', update)
  })
  onBeforeUnmount(() => {
    hp.off(window, 'resize', update)
  })
  return windowSize
}
