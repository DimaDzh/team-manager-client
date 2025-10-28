<template>
  <div class="max-w-screen-sm mx-auto py-10">
    <UForm
      :state="formState"
      :schema="formSchema"
      class="bg-gray-300 p-10 rounded-md flex flex-col gap-4 w-full space-y-3"
      @submit="handleSubmit"
    >
      <h1 class="text-2xl font-bold mb-4">Create Account</h1>

      <UFormField label="Full Name" name="fullName" class="w-full">
        <UInput
          v-model="formState.fullName"
          type="text"
          placeholder="Enter your full name"
          size="lg"
        />
      </UFormField>

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

      <UFormField
        label="Confirm Password"
        name="confirmPassword"
        class="w-full"
      >
        <div class="relative">
          <UInput
            v-model="formState.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm your password"
            size="lg"
            class="pr-10"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            @click="toggleConfirmPasswordVisibility"
          >
            <EyeSlashIcon v-if="showConfirmPassword" class="w-5 h-5" />
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
        {{ loading ? "Creating Account..." : "Create Account" }}
      </UButton>

      <div
        v-if="error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ error }}
      </div>

      <div
        v-if="success"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
      >
        {{ success }}
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { z } from "zod";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

const { register } = useAuth();

const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const formState = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const loading = ref(false);
const error = ref("");
const success = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const handleSubmit = async (event) => {
  if (loading.value) return;

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    console.log("Form submitted with:", event.data);
    await register(event.data.email, event.data.password, event.data.fullName);
    success.value = "Account created successfully! You can now log in.";

    // Reset form
    formState.fullName = "";
    formState.email = "";
    formState.password = "";
    formState.confirmPassword = "";

    // Redirect to login page after successful registration
    setTimeout(() => {
      navigateTo("/auth/login");
    }, 2000);
  } catch (err) {
    error.value = err.message || "Registration failed";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
