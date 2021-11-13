<template>
  <button
    class="bg-primary rounded-md text-white hover:bg-primary-link flex justify-center items-center py-3"
  >
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton'
}
</script>
