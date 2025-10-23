export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  const config = useRuntimeConfig();
  const apiUrl = config.apiUrl || "http://localhost:3030";

  try {
    // Call your backend API
    const response = await $fetch<{ access_token: string; user: any }>(
      `${apiUrl}/auth/login`,
      {
        method: "POST",
        body: { email, password },
      }
    );

    if (!response.access_token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

    // Fetch user details from your backend using the token
    const user: any = await $fetch(`${apiUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    }).catch(() => {
      // If user fetch fails, create a basic user object
      return {
        id: "temp",
        email,
        fullName: email.split("@")[0],
        role: "USER",
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
      statusCode: error.statusCode || 401,
      statusMessage: error.message || "Authentication failed",
    });
  }
});
