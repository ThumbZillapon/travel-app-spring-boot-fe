<template>
  <nav
    class="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50 rounded-lg"
  >
    <router-link
      to="/"
      class="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
    >
      เที่ยวไหนดี
    </router-link>

    <div class="flex items-center space-x-6">
      <template v-if="auth.state.isAuthenticated">
        <span
          v-if="username"
          class="text-gray-700 font-semibold flex items-center space-x-2"
        >
          <span class="text-sm text-blue-500"></span>
          <span class=" text-blue-500">{{ username }}</span>
        </span>
        <router-link
          to="/Dashboard"
          class="inline-flex items-center px-4 py-2 text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200 rounded-lg"
        >
          Dashboard
        </router-link>
        <button
          @click="auth.logout"
          class="inline-flex items-center justify-center px-4 py-2 text-white bg-red-500 hover:bg-red-600 transition duration-200 rounded-lg shadow-sm"
        >
          Logout
        </button>
      </template>
      <template v-else>
        <router-link
          to="/login"
          class="text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="text-gray-700 border-b-2 border-transparent hover:border-blue-600 transition duration-200"
        >
          Register
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAuth } from "../composables/useAuth";

const auth = useAuth();

const username = computed(() => {
  const user = auth.state.user;
  if (!user) return "";
  return user.displayName || user.email || "";
});
</script>

