export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  // Redirect to login if not authenticated
  if (!loggedIn.value) {
    return navigateTo("/");
  }
});
