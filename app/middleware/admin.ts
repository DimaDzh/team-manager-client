export default defineNuxtRouteMiddleware(() => {
  const { user } = useUserSession();

  // Check if user is authenticated
  if (!user.value) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authentication required",
    });
  }

  // Check if user has admin role
  if (user.value.role !== "ADMIN") {
    throw createError({
      statusCode: 403,
      statusMessage: "Admin access required",
    });
  }
});
