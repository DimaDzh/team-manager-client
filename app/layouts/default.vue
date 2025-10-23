<template>
  <div class="min-h-screen bg-gray-50">
    <header>
      <nav class="shadow p-4 bg-gray-700">
        <div class="container flex justify-between items-center mx-auto">
          <h1 class="text-xl font-bold">My App</h1>
          <nav>
            <ul class="flex flex-row space-x-4">
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/about">About</NuxtLink></li>
              <li v-if="!isAuthenticated">
                <NuxtLink to="/login">Login</NuxtLink>
              </li>
              <li v-if="!isAuthenticated">
                <NuxtLink to="/register">Register</NuxtLink>
              </li>
              <li v-if="isAuthenticated">
                <UserDropDown />
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
const { login, register, logout, user, isAuthenticated } = useAuth();

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = async () => {
  await logout();
  showUserMenu.value = false;
};
onMounted(() => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) {
      showUserMenu.value = false;
    }
  });
});
</script>
