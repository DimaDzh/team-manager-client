export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  // If already logged in and trying to go to home, redirect to dashboard
  if (loggedIn.value && to.path === "/") {
    return navigateTo("/dashboard");
  }
});
