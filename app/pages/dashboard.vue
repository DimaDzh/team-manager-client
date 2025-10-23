<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">Dashboard</h1>
      <div v-if="user" class="bg-gray-100 p-4 rounded-lg">
        <h2 class="text-lg font-semibold mb-2">
          Welcome, {{ user.fullName }}!
        </h2>
        <p class="text-gray-600">Email: {{ user.email }}</p>
        <p class="text-gray-600">Role: {{ user.role }}</p>
      </div>
    </div>

    <!-- Admin Link -->
    <div v-if="user?.role === 'ADMIN'" class="mb-6">
      <NuxtLink
        to="/admin"
        class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Admin Panel
      </NuxtLink>
    </div>

    <button
      class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      @click="handleLogout"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
// Apply auth middleware to protect this route
definePageMeta({
  middleware: "auth",
});

const { logout, user } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
