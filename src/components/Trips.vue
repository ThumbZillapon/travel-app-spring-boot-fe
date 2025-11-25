<template>
  <section class="py-8">
    <div class="flex flex-col gap-6">
      <TripCard
        v-for="trip in displayedTrips"
        :key="trip.id"
        :trip="trip"
        @tagClick="onTagClick"
      />
    </div>

    <div v-if="showLoadMore" class="text-center mt-6">
      <button
        @click="loadMore"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Load More
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineEmits } from "vue";
import TripCard from "./TripCard.vue";
import type { Trip } from "../types/trip";
import type { PropType } from "vue";

const props = defineProps({
  trips: {
    type: Array as PropType<Trip[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: "tagSelected", tag: string): void;
}>();

const itemsPerPage = 6; // จำนวนการ์ดต่อ load
const currentPage = ref(1);

// คำนวณ trips ที่จะแสดง
const displayedTrips = computed(() => {
  return props.trips.slice(0, currentPage.value * itemsPerPage);
});

// ปุ่ม Load More แสดงถ้ายังมี trips เหลือ
const showLoadMore = computed(() => {
  return displayedTrips.value.length < props.trips.length;
});

// ฟังก์ชันโหลด batch ต่อไป
const loadMore = () => {
  currentPage.value++;
};

const onTagClick = (tag: string) => {
  emit("tagSelected", tag);
};

// Reset current page when trips change
watch(() => props.trips, () => {
  currentPage.value = 1;
});
</script>

