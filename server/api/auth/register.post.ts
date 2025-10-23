export default defineEventHandler(async (event) => {
  const { email, password, fullName, role = "USER" } = await readBody(event);

  if (!email || !password || !fullName) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email, password, and full name are required",
    });
  }

  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl || "http://localhost:3030";

  try {
    // Call your backend API
    const response = await $fetch<{ access_token: string; user: any }>(
      `${apiUrl}/auth/register`,
      {
        method: "POST",
        body: { email, password, fullName, role },
      }
    );

    if (!response.access_token) {
      throw createError({
        statusCode: 400,
        statusMessage: "Registration failed",
      });
    }

    // Fetch user details from your backend using the token
    const user: any = await $fetch(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    }).catch(() => {
      // If user fetch fails, create a basic user object
      return {
        id: "temp",
        email,
        fullName,
        role,
      };
    });

    // Set user session using nuxt-auth-utils
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token: response.access_token,
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 400,
      statusMessage: error.message || "Registration failed",
    });
  }
});
