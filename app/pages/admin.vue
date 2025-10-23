<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Panel</h1>

    <div class="mb-6 p-4 bg-blue-100 rounded-lg">
      <p class="text-blue-800">
        This is an admin-only page. Only users with ADMIN role can access this
        page.
      </p>
    </div>

    <div v-if="user" class="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg font-semibold mb-2">Current User</h2>
      <p><strong>Name:</strong> {{ user.fullName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>

    <div class="space-x-4">
      <NuxtLink
        to="/dashboard"
        class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back to Dashboard
      </NuxtLink>

      <button
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
// Apply admin middleware to protect this route
definePageMeta({
  middleware: "admin",
});

const { logout, user } = useAuth();
</script>
