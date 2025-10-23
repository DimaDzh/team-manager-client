export function useAuth() {
  const { user, loggedIn, fetch: refreshSession, clear } = useUserSession();

  const login = async (email: string, password: string) => {
    try {
      const result = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });
      await refreshSession();
      await navigateTo("/dashboard");
      return result.user;
    } catch (error: any) {
      throw new Error(error.data?.message || "Login failed");
    }
  };

  const register = async (
    email: string,
    password: string,
    fullName: string,
    role = "ADMIN"
  ) => {
    try {
      const result = await $fetch("/api/auth/register", {
        method: "POST",
        body: { email, password, fullName, role },
      });
      await refreshSession();
      await navigateTo("/dashboard");
      return result.user;
    } catch (error: any) {
      throw new Error(error.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      await clear();
      await navigateTo("/");
    } catch (error) {
      // Still navigate even if logout fails
      await clear();
      await navigateTo("/");
    }
  };

  const isAuthenticated = computed(() => loggedIn.value);

  return {
    login,
    register,
    logout,
    isAuthenticated,
    user,
    refreshSession,
  };
}
