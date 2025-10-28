<template>
  <div>
    <div class="max-w-lg mx-auto mt-20">
      <h1 class="text-2xl font-bold mb-4 text-center">Welcome</h1>

      <!-- Toggle between Login and Create Account -->
      <div class="flex justify-center mb-6">
        <div class="bg-gray-200 p-1 rounded-lg">
          <button
            :class="[
              'px-4 py-2 rounded-md font-medium transition-colors duration-200',
              !isSignup
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="isSignup = false"
          >
            Login
          </button>
          <button
            :class="[
              'px-4 py-2 rounded-md font-medium transition-colors duration-200',
              isSignup
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            ]"
            @click="isSignup = true"
          >
            Create Account
          </button>
        </div>
      </div>

      <!-- Form Components -->
      <div class="transition-all duration-300">
        <CustomLoginForm v-if="!isSignup" />
        <CustomCreateUserForm v-else />
      </div>

      <!-- Toggle Link -->
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600">
          {{ isSignup ? "Already have an account?" : "Don't have an account?" }}
          <button
            class="text-blue-600 hover:text-blue-800 font-medium underline ml-1"
            @click="toggleForm"
          >
            {{ isSignup ? "Login here" : "Create one here" }}
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isSignup = ref(false);

const toggleForm = () => {
  isSignup.value = !isSignup.value;
};
</script>
