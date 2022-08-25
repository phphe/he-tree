<template>
  <VModal v-model="visible" width="md" noClose @close="onclose" fullscreenForSm>
    <div class="">
      <div class="flex items-center">
        <vInput
          v-model="searchText"
          class="w-full"
          :size="windowSize.innerWidth > 768 ? 'lg' : 'sm'"
          @input="search"
          @change="search"
          :placeholder="$t('Search')"
          name="search"
          ref="inputCpt"
        >
          <template #suffix>
            <vIconMDI :icon="mdiSearch" />
          </template>
        </vInput>
        <VIconMDI
          v-if="windowSize.innerWidth <= 768"
          class="ml-1"
          :icon="mdiClose"
          :size="24"
          @click="visible = false"
        />
      </div>
      <template v-if="searchedOnce">
        <hr class="mt-6" />
        <div class="search-result mt-6">
          <div
            v-if="result.length === 0"
            class="text-center p-4 text-lg text-gray-400"
          >
            {{ $t('No search results') }}
          </div>
          <template v-else>
            <Anchor
              v-for="family in result"
              :to="family[family.length - 1].url"
              @click="visible = false"
              class="block py-3 px-2 border mb-2 rounded text-sm text-gray-900 cursor-pointer hover:bg-gray-100"
            >
              <template v-for="(item, i) in family">
                <span>{{ item.title }}</span>
                <span v-if="i < family.length - 1" class="mx-1">&gt;</span>
              </template>
            </Anchor>
          </template>
        </div>
      </template>
    </div>
  </VModal>
</template>

<script setup lang="ts">
  import {
    defineProps,
    defineEmits,
    watch,
    computed,
    ref,
    nextTick,
  } from 'vue-demi'
  import { mdiSearch, mdiClose } from 'mdi-js/filled'
  import fuzzySearch from '../plugins/fuzzySearch'
  import * as hp from 'helper-js'
  import { search as searchPaths } from '../current'
  import VIconMDI from '../components/VIconMDI.vue'
  import useWindowSize from '../plugins/useWindowSize'

  const props = defineProps({
    modelValue: Boolean,
  })
  const emit = defineEmits(['update:modelValue'])
  const visible = computed({
    get() {
      return props.modelValue
    },
    set(v) {
      emit('update:modelValue', v)
    },
  })
  const searchText = ref('')
  const searchedOnce = ref(false)
  const result = ref<Awaited<ReturnType<typeof fuzzySearch>>>([])
  const search = hp.debounceTrailing(async function () {
    if (searchText.value?.length > 1) {
      result.value = await fuzzySearch(searchText.value, searchPaths.value)
    } else {
      result.value = []
    }
    searchedOnce.value = true
  }, 300).action
  const onclose = () => {
    // result.value = []
    // searchedOnce.value = false
    // searchText.value = ''
  }
  const windowSize = useWindowSize()
  const inputCpt = ref()
  watch(
    () => visible.value,
    async () => {
      await nextTick()
      inputCpt.value?.focus()
    }
  )
</script>

<style lang="scss"></style>
