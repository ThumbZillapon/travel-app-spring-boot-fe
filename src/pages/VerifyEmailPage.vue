<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
      <div v-if="status === 'loading'">
        <svg
          class="animate-spin h-10 w-10 text-green-600 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <h1 class="text-xl font-semibold mb-2">
          Verifying your email...
        </h1>
        <p class="text-gray-500">
          Please wait a moment while we confirm your account.
        </p>
      </div>

      <div v-else-if="status === 'success'">
        <h1 class="text-2xl font-bold text-green-600 mb-3">
          Email verified!
        </h1>
        <p class="text-gray-600 mb-4">
          {{ message }}
        </p>
        <router-link
          to="/login"
          class="text-blue-600 hover:underline font-medium"
        >
          Continue to login
        </router-link>
      </div>

      <div v-else>
        <h1 class="text-2xl font-bold text-red-600 mb-3">
          Verification failed
        </h1>
        <p class="text-gray-600 mb-4">
          {{ message }}
        </p>
        <router-link
          to="/register"
          class="text-blue-600 hover:underline font-medium"
        >
          Back to register
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../api.ts";

type Status = "loading" | "success" | "error";

const status = ref<Status>("loading");
const message = ref(
  "Email verified successfully. You will be redirected shortly."
);
const route = useRoute();
const router = useRouter();

const verifyEmail = async () => {
  const token = route.query.token;

  if (!token || typeof token !== "string") {
    status.value = "error";
    message.value = "Invalid verification link.";
    return;
  }

  try {
    const { data } = await api.post("/auth/verify-email", { token });
    status.value = "success";
    message.value =
      data?.message || "Email verified successfully. You can now log in.";

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error: any) {
    status.value = "error";
    message.value =
      error.response?.data?.message ||
      "Verification link is invalid or has expired.";
  }
};

onMounted(verifyEmail);
</script>


