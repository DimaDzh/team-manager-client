<template>
  <div class="max-w-sm mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-4">Welcome</h1>

    <div
      v-if="error"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
    >
      {{ error }}
    </div>

    <form class="space-y-3" @submit.prevent="onSubmit">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full rounded"
        required
      />
      <input
        v-if="isSignup"
        v-model="fullName"
        type="text"
        placeholder="Full name"
        class="border p-2 w-full rounded"
        required
      />

      <button
        class="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 disabled:opacity-50"
        type="submit"
        :disabled="loading"
      >
        {{ loading ? "Loading..." : isSignup ? "Sign Up" : "Sign In" }}
      </button>
    </form>

    <p class="mt-3 text-sm text-center">
      {{ isSignup ? "Already have an account?" : "Need an account?" }}
      <button class="text-blue-600 underline" @click="isSignup = !isSignup">
        {{ isSignup ? "Sign In" : "Sign Up" }}
      </button>
    </p>
  </div>
</template>

<script setup>
const { login, register } = useAuth();

const email = ref("");
const password = ref("");
const fullName = ref("");
const isSignup = ref(false);
const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    if (isSignup.value) {
      await register(email.value, password.value, fullName.value);
    } else {
      await login(email.value, password.value);
    }
  } catch (err) {
    error.value = err.message || "Authentication failed";
  } finally {
    loading.value = false;
  }
};
</script>
