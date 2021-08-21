<template lang="pug">
.popup.popup-activator.cursor-pointer(ref="activator"
  @click="onclickActivator"
  @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"
  :class="caret ? 'inline-flex items-center' : 'inline-block'"
  v-bind="$attrs"
)
  slot
  Icon.caret.popup-caret.relative.transition(v-if="caret" :class="{'transform rotate-180': localVisible}" name="arrow_drop_down")
teleport(to="body")
  transition(:name="transition")
    .popup-card.bg-white(
      v-if="mode === 'new' ? localVisible : true"
      v-show="mode === 'new' ? true : localVisible"
      ref="card" @click="onclickCard" :style="cardStyle" @mouseenter="_cancelCloseDelayily()" @mouseleave="onMouseLeave"
      :class="[{'popup-card-nowrap': nowrap}]"
    )
      slot(name="card")
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import * as hp from 'helper-js'
  import Icon from './Icon.vue'
  import '../assets/style/transitions/fade.scss'

  export default defineComponent({
    components: { Icon },
    props: {
      mode: {
        type: String,
        default: 'new', // new/display
      },
      minWidth100: { type: Boolean, default: false },
      persistent: { type: Boolean }, // don't close when click outside
      hover: { type: Boolean }, // open on hover
      autoOpen: { type: Boolean, default: true },
      nowrap: { type: Boolean },
      space: { type: Number, default: 5 },
      caret: { type: Boolean }, // show caret
      menu: { type: Boolean }, // auto close when click card
      transition: { type: String, default: 'fade' },
    },
    data() {
      return {
        cardStyle: {},
        localVisible: false,
      }
    },
    mounted() {
      this.$watch(
        'localVisible',
        (localVisible: boolean, old?: boolean) => {
          if (localVisible == old) return
          //
          if (!localVisible) {
            this._showByHover = false
            this._showByClick = false
          }
          //
          if (localVisible) {
            // globalListner
            this._onDocCick = (e) => this.onDocumentClick(e)
            hp.onDOM(document, 'click', this._onDocCick, true)
            //
            this._onUserInput = (e) => {
              if (this.localVisible) {
                this.updateCardPosition()
              }
            }
            this.onParentsScroll()
            const userInputEventNames = [
              'click',
              'mousedown',
              'mouseup',
              'keydown',
              'touchstart',
              'touchend',
              'touchmove',
              'touchcancel',
              'resize',
              'scroll',
            ]
            this._offUserInput = hp.onDOMMany(
              [window],
              userInputEventNames,
              this._onUserInput
            )
            this._offGlobalListner = () => {
              hp.offDOM(document, 'click', this._onDocCick, true)
              this._offUserInput()
              this.offParentsScroll()
            }
            //
            this.cardStyle = { visibility: 'hidden' }
            this.$nextTick(() => {
              const { card } = this.$refs
              this.updateCardPosition()
            })
          } else {
            if (this._offGlobalListner) {
              this._offGlobalListner()
              this._offGlobalListner = null
            }
          }
        },
        { immediate: true }
      )
    },
    beforeUnmount() {
      if (this._offGlobalListner) {
        this._offGlobalListner()
        this._offGlobalListner = null
      }
    },
    // watch: {},
    methods: {
      show() {
        this.localVisible = true
      },
      close() {
        this.localVisible = false
      },
      onDocumentClick(e) {
        const target = e.target
        const { card } = this.$refs
        const isClickOutside =
          this.$refs.activator !== target &&
          !hp.isDescendantOf(target, this.$refs.activator) &&
          (!card || (card !== target && !hp.isDescendantOf(target, card)))
        if (isClickOutside) {
          if (!this.persistent) {
            this.localVisible = false
          }
          this.$emit('click-outside', { nativeEvent: e, vm: this })
        } else {
          this.$emit('click-inside', { nativeEvent: e, vm: this })
        }
      },
      onclickActivator(e) {
        this.$emit('click-activator', { nativeEvent: e, vm: this })
        if (this.autoOpen) {
          if (this.hover) {
            if (this._showByHover) {
              if (this.localVisible) {
                this._showByHover = false
                this._showByClick = true
              }
            } else {
              this.localVisible = !this.localVisible
              if (this.localVisible) {
                this._showByClick = true
              }
            }
          } else {
            this.localVisible = !this.localVisible
          }
        }
      },
      onMouseEnter(e) {
        if (this.hover) {
          this._cancelCloseDelayily()
          if (!this.localVisible) {
            this._showByHover = true
          }
          this.show()
        }
      },
      onMouseLeave(e) {
        if (this.hover && !this._showByClick) {
          this._closeDelayily()
        }
      },
      _closeDelayily() {
        this._timeoutID = setTimeout(() => this.close(), 150)
      },
      _cancelCloseDelayily() {
        clearTimeout(this._timeoutID)
        this._timeoutID = null
      },
      onclickCard(e) {
        if (this.menu) {
          this.close()
        }
        this.$emit('click-card', { nativeEvent: e, vm: this })
      },
      updateCardPosition() {
        // if (!this._debounced_updateCardPosition) {
        //   this._debounced_updateCardPosition = hp.debounceTrailing(this._updateCardPosition, 0).action
        // }
        // this._debounced_updateCardPosition()
        this._updateCardPosition() // no debounce
      },
      _updateCardPosition() {
        const { space } = this
        const vp = hp.getViewportPosition(this.$refs.activator)
        const activatorW = this.$refs.activator.offsetWidth
        const activatorH = this.$refs.activator.offsetHeight
        // available space
        const left = vp.x + activatorW
        const right = window.innerWidth - vp.x - 25 // scroll bar may exist, so reduce 25
        const top = vp.y
        const bottom = window.innerHeight - vp.y - activatorH
        this.cardStyle = {
          top: `${vp.y + activatorH + space}px`,
          left: `${vp.x}px`,
        }
        if (this.minWidth100) {
          this.cardStyle.minWidth = `${activatorW}px`
        }
        this.$nextTick(() => {
          const { card } = this.$refs
          if (!card) {
            return
          }
          const { offsetWidth: cardW, offsetHeight: cardH } = card
          const cardStyle = {}
          if (this.minWidth100) {
            cardStyle.width = `${cardW}px`
          }
          let cardVP = {}
          if (right > cardW || left < cardW) {
            cardVP.x = vp.x
          } else {
            cardVP.x = left - cardW
          }
          if (bottom > cardH || top < cardH) {
            cardVP.y = vp.y + activatorH + space
          } else {
            cardVP.y = vp.y - space - cardH
          }
          cardStyle.left = `${cardVP.x}px`
          cardStyle.top = `${cardVP.y}px`
          this.cardStyle = cardStyle
        })
      },
      onParentsScroll() {
        const parents = []
        let cur = this.$refs.activator.parentElement
        while (cur) {
          parents.push(cur)
          cur = cur.parentElement
        }
        const handler = () => {
          if (this.localVisible) {
            this.updateCardPosition()
          }
        }
        parents.forEach((el) => hp.onDOM(el, 'scroll', handler))
        this._offParentsScroll = () => {
          parents.forEach((el) => hp.offDOM(el, 'scroll', handler))
        }
      },
      offParentsScroll() {
        if (this._offParentsScroll) {
          this._offParentsScroll()
          this._offParentsScroll = null
        }
      },
    },
  })
</script>

<style lang="scss">
  .popup {
  }
  .popup-caret {
    top: 2px;
  }
  .popup-card {
    position: fixed;
    box-sizing: border-box;
    // z-index: $popupZIndex;
    // for popup child mode. 弹出元素作为popup子元素时
    // z-index: 999999;
    // min-width: 100%;
  }
  .popup-card-nowrap {
    white-space: nowrap;
  }
</style>
