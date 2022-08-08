// TODO
import * as VueRouter from 'vue-router'
import { ref, nextTick } from 'vue'
import * as hp from 'helper-js'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    /**
     * apply on document.scrollingElement
     */
    applyOnRoot: Boolean,
    toHash: { type: Boolean, default: true },
    toAnchor: Boolean,
    delay: { type: Number, default: 0 },
    rememberPosition: { type: Boolean, default: true },
  },
  render() {
    return !this.applyOnRoot && <div ref="root">{this.$slots.default}</div>
  },
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      next()
    })
  },
})

// export default function (
//   router: VueRouter.Router,
//   getScrollingElements: () => Element[] = () =>
//     document.scrollingElement ? [document.scrollingElement] : []
// ) {
//   const savedPositions: Record<
//     string,
//     Record<string, { top: number; left: number }>
//   > = {}
//   router.beforeEach((to, from, next) => {
//     if (hp.isDocumentExisted()) {
//       // only execute in browser
//       const els = getScrollingElements().filter((v) => v)
//       savedPositions[from.fullPath] = {}
//       const positions = savedPositions[from.fullPath]
//       for (const scrollingElement of els) {
//         positions[getScrollingElementID(scrollingElement)] = {
//           left: scrollingElement.scrollLeft,
//           top: scrollingElement.scrollTop,
//         }
//       }
//     }
//     next()
//   })
//   router.afterEach((to, from, failure) => {
//     if (hp.isDocumentExisted()) {
//       // only execute in browser
//       if (failure) {
//         return
//       }
//       const positions = savedPositions[to.fullPath]
//       const els = getScrollingElements().filter((v) => v)
//       const hasPosition = new Set()
//       if (positions) {
//         for (const scrollingElement of els) {
//           const position = positions[getScrollingElementID(scrollingElement)]
//           if (position) {
//             scrollingElement.scrollTo(position.left, position.top)
//             hasPosition.add(scrollingElement)
//           }
//         }
//       }
//       if (to.hash) {
//         const localID = ++latestID
//         const elID = decodeURIComponent(location.hash.substr(1))
//         nextTick(() => {
//           for (const scrollingElement of els) {
//             if (hasPosition.has(scrollingElement)) {
//               continue
//             }
//           }
//           const getEl = () =>
//             document.getElementById(elID) || document.getElementsByName(elID)[0]
//           hp.waitFor(() => Boolean(getEl()), 60, 333).promise.then(() => {
//             if (localID !== latestID) {
//               // expired
//               return
//             }
//             const el = getEl()
//             setTimeout(() => {
//               el.scrollIntoView && el.scrollIntoView()
//             }, 100)
//           })
//         })
//       }
//     }
//   })
// }

// function getScrollingElementID(el: Element) {
//   if (el === document.documentElement) {
//     return '__html__'
//   } else if (el === document.body) {
//     return '__body__'
//   } else {
//     const id = el.getAttribute('id')
//     if (!id) {
//       throw `The scrolling element must be set id`
//     }
//     return id
//   }
// }
