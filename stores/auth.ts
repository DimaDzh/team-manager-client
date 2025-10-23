import { defineStore } from "pinia";

type UserRole = "ADMIN" | "COACH" | "PLAYER";

type User = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.user?.role,
    isAdmin: (state) => state.user?.role === "ADMIN",
    isCoach: (state) => state.user?.role === "COACH",
    isPlayer: (state) => state.user?.role === "PLAYER",
  },

  actions: {
    async login(email: string, password: string) {
      try {
        const { user } = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });
        this.user = user;
        return user;
      } catch (error: any) {
        throw new Error(error.data?.message || "Login failed");
      }
    },

    async register(
      email: string,
      password: string,
      fullName: string,
      role: UserRole = "PLAYER"
    ) {
      try {
        const { user } = await $fetch("/api/auth/register", {
          method: "POST",
          body: { email, password, fullName, role },
        });
        this.user = user;
        return user;
      } catch (error: any) {
        throw new Error(error.data?.message || "Registration failed");
      }
    },

    async logout() {
      try {
        await $fetch("/api/auth/logout", {
          method: "POST",
        });
        this.user = null;
      } catch (error) {
        // Still clear user even if logout fails
        this.user = null;
      }
    },

    async fetchUser() {
      try {
        const { user } = await $fetch("/api/auth/me");
        this.user = user;
        return user;
      } catch (error) {
        this.user = null;
        return null;
      }
    },

    setUser(user: User | null) {
      this.user = user;
    },
  },
});
