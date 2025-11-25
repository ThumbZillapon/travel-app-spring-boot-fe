<template>
  <div
    class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col gap-4 md:flex-row md:gap-6 md:h-[260px] overflow-hidden"
  >
    <div
      class="w-full md:w-1/3 rounded-xl overflow-hidden h-[220px] md:h-full bg-gray-100"
    >
      <img
        :src="coverPhoto"
        :alt="`${trip.title} photo`"
        class="w-full h-full object-cover"
        @error="onImageError"
      />
    </div>

    <div class="flex-1 flex flex-col gap-2 md:h-full">
      <div>
        <h3 class="text-2xl font-semibold text-gray-900 mb-1 text-left">
          {{ trip.title }}
        </h3>
        <p class="text-gray-600 text-sm leading-relaxed max-h-16 overflow-hidden text-left">
          {{ truncateText(trip.description, 160) }}
        </p>
      </div>

      <div v-if="hasTags" class="text-sm text-gray-600 flex flex-wrap gap-1">
        <span class="font-semibold text-gray-800 mr-1">หมวด:</span>
        <template v-for="(tag, index) in trip.tags" :key="`${trip.id}-tag-${index}`">
          <button
            type="button"
            class="text-blue-600 hover:underline cursor-pointer bg-transparent border-none p-0"
            @click="onTagClick(tag)"
          >
            {{ tag }}
          </button>
          <span v-if="index < trip.tags.length - 2" class="text-gray-400">
            ,
          </span>
          <span v-else-if="index === trip.tags.length - 2" class="text-gray-400">
            และ
          </span>
        </template>
      </div>

      <div class="flex flex-wrap gap-5 h-14 items-center" aria-label="additional photos">
        <template v-if="altPhotos.length">
          <div
            v-for="(photo, index) in altPhotos"
            :key="`${trip.id}-thumb-${index}`"
            class="w-20 h-20 rounded-xl overflow-hidden bg-gray-100"
          >
            <img
              :src="photo"
              :alt="`${trip.title} alternate photo ${index + 2}`"
              class="w-full h-full object-cover"
              @error="onThumbError"
            />
          </div>
        </template>
        <template v-else>
          <div class="text-gray-300 text-sm">ไม่มีรูปเพิ่มเติม</div>
        </template>
      </div>

      <div class="mt-3 md:mt-auto flex justify-end">
        <router-link
          :to="`/trips/${trip.id}`"
          class="px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          อ่านต่อ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { PropType } from "vue";
import { defineEmits } from "vue";
import type { Trip } from "../types/trip";

const props = defineProps({
  trip: {
    type: Object as PropType<Trip>,
    required: true,
  },
});

const emit = defineEmits<{
  (e: "tagClick", tag: string): void;
}>();

const fallbackImage = new URL("../assets/broken-link-10497.svg", import.meta.url)
  .href;

const coverPhoto = computed(() => {
  const fallback = fallbackImage;
  if (!props.trip.photos || props.trip.photos.length === 0) {
    return fallback;
  }
  return props.trip.photos[0] || fallback;
});

const altPhotos = computed(() => {
  if (!props.trip.photos || props.trip.photos.length <= 1) {
    return [];
  }
  return props.trip.photos.slice(1, 4).filter(Boolean);
});

const hasTags = computed(() => props.trip.tags && props.trip.tags.length > 0);

function truncateText(text: string, length: number): string {
  if (!text) {
    return "";
  }
  return text.length > length ? text.slice(0, length) + "..." : text;
}

function onImageError(event: Event) {
  (event.target as HTMLImageElement).src = fallbackImage;
}

function onThumbError(event: Event) {
  (event.target as HTMLImageElement).src = fallbackImage;
}

function onTagClick(tag: string) {
  emit("tagClick", tag);
}
</script>
