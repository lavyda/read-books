<template>
  <div class="wrapper">
    <div class="carousel">
      <div v-for="item in items" :key="item.id" class="item">
        <Card :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Book } from '../services/types'

export default {
  name: 'Carousel',
  props: {
    items: {
      type: Array as PropType<Book[]>,
      required: true,
    },
  },
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
}

.item {
  min-width: 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  padding: 10rem;
}

.item:not(:first-child) {
  margin-left: -25%;
}
</style>
