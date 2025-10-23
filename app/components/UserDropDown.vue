<template>
  <div class="relative">
    <button
      class="flex items-center space-x-1 cursor-pointer text-white"
      @click="toggleUserMenu"
    >
      <span>User Menu</span>
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        />
      </svg>
    </button>
    <div
      v-if="showUserMenu"
      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
    >
      <NuxtLink
        to="/profile"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="closeMenu"
      >
        Profile
      </NuxtLink>
      <button
        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
const { logout } = useAuth();

const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const closeMenu = () => {
  showUserMenu.value = false;
};

const handleLogout = async () => {
  await logout();
  showUserMenu.value = false;
};

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      showUserMenu.value = false;
    }
  });
});

onUnmounted(() => {
  document.removeEventListener("click", () => {});
});
</script>
