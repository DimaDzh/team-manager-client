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
              <!-- <li v-if="!isAuthenticated">
                <NuxtLink to="/auth/login">Login</NuxtLink>
              </li>
              <li v-if="!isAuthenticated">
                <NuxtLink to="/auth/register">Register</NuxtLink>
              </li>
              <li v-if="isAuthenticated">
                <UserDropDown />
              </li> -->
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

// onMounted(() => {
//   document.addEventListener("click", (e) => {
//     if (!e.target.closest(".relative")) {
//     }
//   });
// });
</script>
