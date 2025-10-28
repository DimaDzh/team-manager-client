<template>
  <div class="max-w-screen-sm mx-auto py-10">
    <UForm
      :state="formState"
      :schema="formSchema"
      class="bg-gray-300 p-10 rounded-md flex flex-col gap-4 w-full space-y-3"
      @submit="handleSubmit"
    >
      <h1 class="text-2xl font-bold mb-4">Login</h1>

      <UFormField label="Email" name="email" class="w-full">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="Enter your email"
          size="lg"
        />
      </UFormField>

      <UFormField label="Password" name="password" class="w-full">
        <div class="relative">
          <UInput
            v-model="formState.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            size="lg"
            class="pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="togglePasswordVisibility"
          >
            <EyeSlashIcon v-if="showPassword" class="w-5 h-5" />
            <EyeIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="loading"
        class="cursor-pointer"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </UButton>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ error }}
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { z } from "zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

const { login } = useAuth();

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const formState = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async (event) => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";

  try {
    console.log("Form submitted with:", event.data);
    await login(event.data.email, event.data.password);
    // Redirect to dashboard or home page after successful login
    await navigateTo("/dashboard");
  } catch (err) {
    error.value = err.message || "Login failed";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
