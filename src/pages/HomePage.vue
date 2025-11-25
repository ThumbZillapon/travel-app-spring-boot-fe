<template>
  <div class="pt-20 px-4">
    <h2 class="text-3xl font-bold mb-6 text-center">
      ค้นหาที่ท่องเที่ยว
    </h2>
    <SearchBar @updateResults="updateTrips" @setKeyword="handleSetKeyword" :keyword="currentKeyword" />
    <div
      v-if="tripsToShow.length === 0"
      class="text-center text-gray-500 mt-12"
    >
      No trips have been added yet. Be the first to share your favorite spot!
    </div>
    <Trips v-else :trips="tripsToShow" @tagSelected="handleTagSelected" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SearchBar from "../components/SearchBar.vue";
import Trips from "../components/Trips.vue";
import { api } from "../api.ts";
import type { Trip } from "../types/trip";

const allTrips = ref<Trip[]>([]);
const tripsToShow = ref<Trip[]>([]);

const currentKeyword = ref<string>("");

const fetchTrips = async (keyword?: string) => {
  try {
    const response = await api.get<Trip[]>("/trips", {
      params: { query: keyword || undefined },
    });
    allTrips.value = response.data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    tripsToShow.value = allTrips.value;
  } catch (error: any) {
    console.error("Failed to fetch trips:", error);
    console.error("Error details:", error.response?.data || error.message);
    // Show user-friendly error message
    if (error.response?.status === 404) {
      console.warn("No trips found or endpoint not found");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Cannot connect to backend. Make sure the Spring Boot server is running on http://localhost:8080");
    }
  }
};

const updateTrips = (results: Trip[]) => {
  tripsToShow.value = results;
};

const handleSetKeyword = (keyword: string) => {
  currentKeyword.value = keyword;
};

const handleTagSelected = (tag: string) => {
  currentKeyword.value = tag;
  fetchTrips(tag);
};

onMounted(() => {
  fetchTrips();
});
</script>

