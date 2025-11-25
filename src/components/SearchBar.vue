<template>
  <div class="max-w-md mx-auto mb-6 flex gap-x-2">
    <input
      v-model="keyword"
      @keyup.enter="search"
      type="text"
      placeholder="หาที่เที่ยวแล้วไปกัน ..."
      class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      @click="search"
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      ค้นหา
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, watch, defineProps } from "vue";
import { api } from "../api.ts";
import type { Trip } from "../types/trip.ts";

const props = defineProps<{
  keyword: string;
}>();

const keyword = ref(props.keyword || "");

watch(
  () => props.keyword,
  (newVal) => {
    keyword.value = newVal || "";
  }
);

const emit = defineEmits<{
  (e: "updateResults", trips: Trip[]): void;
  (e: "setKeyword", value: string): void;
}>();

const search = async () => {
  try {
    const response = await api.get<Trip[]>("/trips", {
      params: { query: keyword.value || undefined },
    });
    emit("setKeyword", keyword.value);
    emit("updateResults", response.data);
  } catch (error) {
    console.error("Search failed:", error);
  }
};
</script>

